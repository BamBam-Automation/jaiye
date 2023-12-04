import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Alert, Spinner } from "@material-tailwind/react";
import Input from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";
import { useLocation, useNavigate } from "react-router-dom";

const GenZEventPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location);

  //   useEffect(() => {
  //     if (location.state === null) {
  //       navigate("/");
  //     }
  //   }, []);

  //   const {
  //     name = null,
  //     description = null,
  //     ticketTypes = null,
  //     imageUrls = null,
  //   } = location?.state.event || {};

  const eventData = location?.state?.event || {};
  const {
    name = null,
    description = null,
    ticketTypes = null,
    imageUrls = null,
  } = eventData;

  useEffect(() => {
    if (
      ticketTypes === null ||
      name === null ||
      description === null ||
      imageUrls === null
    ) {
      navigate("/");
    }
  }, []);

  //   console.log(imageUrls[0]);

  const [alert, setAlert] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [icon, setIcon] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [date, setDate] = useState("");
  const [eventPrice, setEventPrice] = useState("");

  // Handle teicketSelection
  const [selectedTicketType, setSelectedTicketType] = useState(null);
  const [ticketName, setTicketName] = useState(null);

  const handleTicketTypeClick = (ticketTypeId, ticketClass) => {
    setSelectedTicketType((prevType) => {
      if (prevType !== ticketTypeId) {
        let newEventPrice = 0;
        const selectedTicket = ticketTypes.find(
          (type) => type.ticketTypeId === ticketTypeId
        );

        if (selectedTicket) {
          newEventPrice = selectedTicket.price;
          setTicketName(selectedTicket.name); // Set the ticket name
          setDate(selectedTicket.ticketDate.eventDateId);
          setEventPrice(selectedTicket.price);
        } else {
          setTicketName(""); // If selectedTicket is not found, reset the ticketName
        }

        // if (ticketClass === 0) {
        //   setSelectedDates([...eventDates.map((date) => date.eventDateId)]);
        // } else {
        //   setSelectedDates([]);
        // }

        // setEventPrice(newEventPrice);
      }
      return ticketTypeId;
    });
  };

  //   useEffect(() => {
  //     console.log(ticketName);
  //   }, [handleTicketTypeClick]);

  const handleSubmit = () => {
    // const amount = eventPrice;
    const url = "events/book/single-day-ticket";
    // const image = imageUrls[0];
    // const event = ticketName;
    const data = {
      referralCode: code,
      ticketTypeId: selectedTicketType,
      eventDateId: date,
    };
    navigate("/summary", {
      state: {
        url,
        data,
        image: imageUrls[0],
        event: ticketName,
        amount: eventPrice,
      },
    });
  };

  return (
    <div className="p-7 grid gap-5 items-start">
      <NavBar title={name} />
      <p className="font-bold text-2xl">{description}</p>
      {alert && (
        <Alert
          animate={{
            mount: { y: 0 },
            unmount: { y: 0 },
          }}
          color={bgColor}
          icon={icon}
          className="absolute h-auto top-8 w-11/12 right-5 z-50"
        >
          {response}
        </Alert>
      )}
      <div className="grid gap-3">
        <p className="font-semibold text-lg text-primary">Event Ticket Types</p>
        <p>Select Ticket Type below:</p>
        <div className="grid gap-5">
          {ticketTypes && ticketTypes.length > 0
            ? ticketTypes.map((ticketType) => (
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
                    <div className="grid gap-3 pb-3">
                      <p className="font-bold">Ticket Valid only on:</p>
                      <p className="border h-10 text-center rounded-lg shadow-xl border-primary grid place-content-center bg-primary/10">
                        {ticketType.ticketDate.date}
                      </p>
                      {/* {eventDates.map((eventDate) => (
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
                  ))} */}
                    </div>
                  )}
                </label>
              ))
            : ""}
          <Input
            label={"Referral Code"}
            type={"text"}
            id={"username"}
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
          <PrimaryButton
            // onClick={handlePayStackBooking}
            onClick={handleSubmit}
            text={loading ? <Spinner color="pink" /> : "Book Event"}
          />
        </div>
      </div>
    </div>
  );
};

export default GenZEventPage;
