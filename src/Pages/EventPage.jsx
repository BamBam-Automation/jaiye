import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Alert, Button, Carousel, Spinner } from "@material-tailwind/react";
import { CiWarning } from "react-icons/ci";
import axiosInstance from "../utils/axios/axios";
import { BsPatchCheck } from "react-icons/bs";
import PageTitle from "../utils/PageTitle";
import PaystackPop from "@paystack/inline-js";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import PrimaryButton from "../components/PrimaryButton";

const EventPage = () => {
  PageTitle("Jaiye - Book Event");

  const email = sessionStorage.getItem("usermail");
  const location = useLocation();
  const summary = location?.state?.event;
  const ticketTypes = summary?.ticketTypes || [];
  const eventDates = summary?.eventDates || [];
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (summary) {
      return;
    } else {
      navigate("/");
    }
  });

  const [selectedTicketType, setSelectedTicketType] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [eventPrice, setEventPrice] = useState(0);

  const handleTicketTypeClick = (ticketTypeId, ticketClass) => {
    setSelectedTicketType((prevType) => {
      if (prevType !== ticketTypeId) {
        let newEventPrice = 0; // Initialize eventPrice to 0
        const selectedTicket = ticketTypes.find(
          (type) => type.ticketTypeId === ticketTypeId
        );

        if (selectedTicket) {
          newEventPrice = selectedTicket.price;
        }

        if (ticketClass === 0) {
          // If ticketClass is 0, select all dates
          setSelectedDates([...eventDates.map((date) => date.eventDateId)]);
        } else {
          // For other ticketClasses, clear selections
          setSelectedDates([]);
        }

        // Set the new eventPrice
        setEventPrice(newEventPrice);
      }
      return ticketTypeId;
    });
  };

  const handleDateClick = (eventDateId, ticketClass) => {
    setSelectedDates((prevDates) => {
      // Check if the date is already selected
      if (prevDates.includes(eventDateId)) {
        // If selected, unselect it
        return prevDates.filter((date) => date !== eventDateId);
      } else {
        if (ticketClass === 0) {
          // If ticketClass is 0, select all dates
          return [...eventDates.map((date) => date.eventDateId)];
        } else if (ticketClass === 2) {
          // If ticketClass is 2 (single-day ticket), only allow selecting one date
          return [eventDateId];
        } else {
          // If ticketClass is 1, check if it's within the valid limit
          const selectedTicket = ticketTypes.find(
            (type) => type.ticketTypeId === selectedTicketType
          );
          if (selectedTicket && prevDates.length < selectedTicket.validDays) {
            // Select the date if within the limit
            return [...prevDates, eventDateId];
          }
        }
        // If none of the above conditions match, don't change the selection
        return prevDates;
      }
    });
  };

  // Flutterwave Payment Option:
  // const config = {
  //   public_key: "FLWPUBK_TEST-4822092bf13ce6312ecbab5ab5f56d40-X",
  //   tx_ref: Date.now(),
  //   amount: eventPrice,
  //   currency: "NGN",
  //   payment_options: "card,mobilemoney,ussd",
  //   customer: {
  //     email: email,
  //     phone_number: phone,
  //     name: "",
  //   },
  //   customizations: {
  //     title: "my Payment Title",
  //     description: "Payment for items in cart",
  //     logo: "https://app.jaiye.ng/static/media/Jaiye.6fde14b11dc8c7148e4b168a5f732b56.svg",
  //   },
  // };

  // const handleFlutterPayment = useFlutterwave(config);
  // const handleSub = () => {
  //   if (selectedTicketType === null) {
  //     setAlert(!alert);
  //     setBgColor("red");
  //     setIcon(<CiWarning />);
  //     setResponse("Please, select date");
  //     return;
  //   }

  //   const selectedTicket = ticketTypes.find(
  //     (type) => type.ticketTypeId === selectedTicketType
  //   );

  //   if (selectedTicket === undefined) {
  //     setAlert(!alert);
  //     setBgColor("red");
  //     setIcon(<CiWarning />);
  //     setResponse("Please, select date");
  //     return;
  //   }

  //   let url = "";
  //   let data = {};

  //   switch (selectedTicket.ticketClass) {
  //     case 0:
  //       url = "events/book/ticket";
  //       data = {
  //         ticketTypeId: selectedTicketType,
  //       };
  //       break;
  //     case 1:
  //       url = "events/book/multiple-days-ticket";
  //       data = {
  //         ticketTypeId: selectedTicketType,
  //         eventDateIds: selectedDates,
  //       };
  //       break;
  //     case 2:
  //       url = "events/book/single-day-ticket";
  //       data = {
  //         ticketTypeId: selectedTicketType,
  //         eventDateId: selectedDates[0],
  //       };
  //       break;
  //     default:
  //       break;
  //   }
  //   console.log(eventPrice);
  //   axiosInstance
  //     .post(url, data)
  //     .then((res) => {
  //       setAlert(!alert);
  //       setBgColor("green");
  //       setIcon(<BsPatchCheck />);
  //       setResponse(`${res.data.message}. Redirecting to payment`);
  //       handleFlutterPayment({
  //         callback: (response) => {
  //           console.log(response);
  //           closePaymentModal();
  //         },
  //         onClose: () => {},
  //       });
  //     })
  //     .catch((err) => {
  //       setAlert(!alert);
  //       setBgColor("red");
  //       setIcon(<CiWarning />);
  //       setResponse(err?.data?.message || err?.message);
  //     });
  // };

  const [alert, setAlert] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [icon, setIcon] = useState("");
  const [response, setResponse] = useState("");

  // Paystack Payment Method
  const handlePayStackBooking = () => {
    if (selectedTicketType === null) {
      setAlert(!alert);
      setBgColor("red");
      setIcon(<CiWarning />);
      setResponse("Please, select date");
      return;
    }

    const selectedTicket = ticketTypes.find(
      (type) => type.ticketTypeId === selectedTicketType
    );

    if (selectedTicket === undefined) {
      setAlert(!alert);
      setBgColor("red");
      setIcon(<CiWarning />);
      setResponse("Please, select date");
      return;
    }

    let url = "";
    let data = {};

    switch (selectedTicket.ticketClass) {
      case 0:
        url = "events/book/ticket";
        data = {
          ticketTypeId: selectedTicketType,
        };
        break;
      case 1:
        url = "events/book/multiple-days-ticket";
        data = {
          ticketTypeId: selectedTicketType,
          eventDateIds: selectedDates,
        };
        break;
      case 2:
        url = "events/book/single-day-ticket";
        data = {
          ticketTypeId: selectedTicketType,
          eventDateId: selectedDates[0],
        };
        break;
      // Add more cases if needed for other ticketClass values
      default:
        break;
    }
    setLoading(true);
    axiosInstance
      .post(url, data)
      .then((res) => {
        setAlert(!alert);
        setBgColor("green");
        setIcon(<BsPatchCheck />);
        setResponse(`${res.data.message}. Redirecting to payment`);
        const paystack = new PaystackPop();
        paystack.newTransaction({
          key: "pk_test_b6dad8eb9616b4f29b0a2a4a3918636326e9870d",
          amount: eventPrice * 100,
          email: email,
          firstname: "",
          lastname: "",
          metadata: {
            tickedtId: selectedTicketType,
            paymentKind: "EventTicket",
          },
          onSuccess(transaction) {
            console.log(transaction);
            let message = `Payment Completed with reference number: ${transaction.reference}`;
            setAlert(!alert);
            setBgColor("green");
            setResponse(message);
            setIcon(<BsPatchCheck />);
          },
          onCancel() {
            setAlert(!alert);
            setResponse("Request failed, please try again");
            setBgColor("red");
            setIcon(<CiWarning />);
          },
        });
        setLoading(false);
        setTimeout(() => {
          navigate("/event-booking");
        }, 3000);
      })
      .catch((err) => {
        setAlert(!alert);
        setBgColor("red");
        setIcon(<CiWarning />);
        setResponse(err?.data?.message || err?.message);
        setLoading(false);
      });
  };

  setTimeout(() => {
    if (alert === true) {
      setAlert(false);
    }
  }, 3000);

  return (
    <div className="p-7 grid gap-5 items-start">
      <NavBar title={summary?.name} />
      <p className="font-bold text-2xl">{summary?.description}</p>
      {alert && (
        <Alert
          animate={{
            mount: { y: 0 },
            unmount: { y: 0 },
          }}
          color={bgColor}
          icon={icon}
          className="absolute h-auto top-8 w-11/12 right-5"
        >
          {response}
        </Alert>
      )}
      <Carousel loop={true} transition={{ duration: 2 }} className="rounded-xl">
        {summary?.imageUrls?.map((event) => (
          <img key={event} src={event} alt="event-banner" />
        ))}
      </Carousel>
      <div className="grid gap-3">
        <p className="font-semibold text-lg text-primary">Event Ticket Types</p>
        <p>Select Ticket Type below:</p>
        <div className="grid gap-5">
          {ticketTypes.map((ticketType) => (
            <label
              className={`border ${
                selectedTicketType === ticketType.ticketTypeId
                  ? "text-primary"
                  : "bg-white text-primary"
              } px-4 py-2 text-center border border-primary rounded-lg shadow-xl grid place-content-center`}
              key={ticketType.ticketTypeId}
              onClick={() =>
                handleTicketTypeClick(
                  ticketType.ticketTypeId,
                  ticketType.ticketClass
                )
              }
            >
              {ticketType.name}
              {selectedTicketType === ticketType.ticketTypeId && (
                <div className="grid gap-5">
                  {eventDates.map((eventDate) => (
                    <label
                      className={`border h-10 text-center rounded-lg shadow-xl border-primary grid place-content-center ${
                        selectedDates.includes(eventDate.eventDateId)
                          ? "bg-primary text-white"
                          : "bg-primary/10 text-primary"
                      }`}
                      key={eventDate.eventDateId}
                      onClick={() =>
                        handleDateClick(
                          eventDate.eventDateId,
                          ticketType.ticketClass
                        )
                      }
                    >
                      {eventDate.date}
                    </label>
                  ))}
                </div>
              )}
            </label>
          ))}
          {/* <Button
            className="bg-primary"
            onClick={
              () => handlePayStackBooking()
              // handleFlutterPayment({
              //   callback: (response) => {
              //     console.log(response);
              //     closePaymentModal();
              //   },
              //   onClose: () => {},
              // })
            }
          >
            {loading ? <Spinner color="pink" /> : "Book Event"}
          </Button> */}
          <PrimaryButton
            onClick={handlePayStackBooking}
            text={loading ? <Spinner color="pink" /> : "Book Event"}
          />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
