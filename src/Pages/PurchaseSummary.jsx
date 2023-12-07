import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { MdOutlineTableBar } from "react-icons/md";
import { BsTicketPerforated } from "react-icons/bs";
import Paystack from "../images/Paystack.svg";
import PrimaryButton from "../components/PrimaryButton";
import { useLocation, useNavigate } from "react-router-dom";
import PaystackPop from "@paystack/inline-js";
import { Alert, Spinner } from "@material-tailwind/react";
import { CiWarning } from "react-icons/ci";
import axiosInstance from "../utils/axios/axios";
import { BsPatchCheck } from "react-icons/bs";

const PurchaseSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const prevData = sessionStorage.getItem("prevSummary");
  const newPrevData = JSON.parse(prevData);
  // console.log(newPrevData);

  //   const { amount, data, event, url, image } = location?.state;
  const {
    amount = null || newPrevData.amount,
    data = null || newPrevData.data,
    event = null || newPrevData.event,
    url = null || newPrevData.url,
    image = null || newPrevData.image,
  } = location?.state || {};

  // useEffect(() => {
  //   if (
  //     amount === null ||
  //     data === null ||
  //     event === null ||
  //     url === null ||
  //     image === null
  //   ) {
  //     navigate("/");
  //   }
  // }, [amount]);

  useEffect(() => {
    if (
      prevData === null &&
      (amount === null ||
        data === null ||
        event === null ||
        url === null ||
        image === null)
    ) {
      // Handle the case where there is no previous data and some required fields are null
      navigate("/");
    } else if (prevData === null) {
      // Handle the case where there is no previous data
      // console.log("No previous data available.");
    } else if (
      amount === null ||
      data === null ||
      event === null ||
      url === null ||
      image === null
    ) {
      // Handle the case where some required fields are null
      // console.log("Some required fields are null.");
    } else {
      // Handle the case where both prevData and required fields are present
      // console.log("Previous data available:", JSON.parse(prevData));
    }
  }, [amount, data, event, url, image, prevData]);

  //   const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const email = sessionStorage.getItem("usermail");

  const [alert, setAlert] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [icon, setIcon] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState("");

  const handlePayment = () => {
    console.log(data);
    if (payment === "") {
      setAlert(!alert);
      setResponse("Please, select payment method");
      setBgColor("red");
      setIcon(<CiWarning />);
      setLoading(false);
    } else if (payment === "paystack") {
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
            key: `${process.env.REACT_APP_PAYSTACK}`,
            amount: amount * 100 + 35000,
            email: email,
            firstname: "",
            lastname: "",
            metadata: {
              ticketId: res.data.data.ticketId,
              paymentKind: "EventTicket",
            },
            onSuccess(transaction) {
              let message = `Payment Completed with reference number: ${transaction.reference}`;
              setAlert(!alert);
              setBgColor("green");
              setResponse(message);
              setIcon(<BsPatchCheck />);
              setLoading(false);
              setTimeout(() => {
                navigate("/event-booking", {
                  state: {
                    event: event,
                    details: transaction.reference,
                    amount: amount,
                    ticketSummary: res.data.data.encodedTicket,
                  },
                });
              }, 3000);
            },
            onCancel() {
              setAlert(!alert);
              setResponse("Request failed, please try again");
              setBgColor("red");
              setIcon(<CiWarning />);
              setLoading(false);
            },
          });
        })
        .catch((err) => {
          setAlert(!alert);
          setBgColor("red");
          setIcon(<CiWarning />);
          if (err && err.response && err.response.status === 401) {
            console.log(err);
            sessionStorage.setItem("previousPage", window.location.href);
            sessionStorage.setItem(
              "prevSummary",
              JSON.stringify(location?.state)
            );
            navigate("/join");
          }
          setResponse(err?.response?.data?.message || err?.message);
          setLoading(false);
        });
    }
  };

  setTimeout(() => {
    if (alert === true) {
      setAlert(false);
    }
  }, 3000);

  return (
    <div className="p-7 grid gap-5 items-start">
      {alert && (
        <Alert
          animate={{
            mount: { y: 0 },
            unmount: { y: 0 },
          }}
          color={bgColor}
          icon={icon}
          className="absolute h-auto top-8 mx-auto w-11/12 right-5 z-50"
        >
          {response}
        </Alert>
      )}
      <NavBar title={"Purchase Summary"} />
      {/* <p className="font-bold text-2xl text-primary">{event}</p> */}
      <div className="grid items-start mt-10">
        <div className="flex gap-5 items-center">
          <img
            className="w-1/2 h-1/2 rounded-lg object-cover"
            src={image}
            alt="event_picture"
          />
          <div className="basis-1/2 space-y-3">
            <h3 className="font-semibold text-primary">{event}</h3>
            {/* <div className="flex gap-3 items-center">
              <MdOutlineTableBar className="text-primary h-5 w-5" />
              <h6 className="font-semibold">VIP Table</h6>
            </div> */}
            <div className="flex gap-3 items-center">
              <BsTicketPerforated className="text-primary -rotate-45 h-5 w-5" />
              {/* <p>{`${tableType.price} Naira`}</p> */}
              <p>{`${amount || newPrevData.amount} Naira`}</p>
            </div>
          </div>
        </div>
      </div>
      <form action="" className="grid gap-5">
        <p className="font-semibold text-xl">Payment Method</p>
        <div className="p-5">
          <label
            htmlFor="paystack"
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex gap-2 items-center">
              <img src={Paystack} alt="" />
              <p>Paystack</p>
            </div>
            <input
              type="radio"
              value={"paystack"}
              name="paymentMethod"
              id="paystack"
              onChange={(e) => {
                setPayment(e.target.value);
              }}
            />
          </label>
        </div>
        <PrimaryButton
          onClick={handlePayment}
          text={loading ? <Spinner color="pink" /> : "Book Event"}
        />
      </form>
    </div>
  );
};

export default PurchaseSummary;
