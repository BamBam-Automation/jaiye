import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Alert, Button } from "@material-tailwind/react";
import { CiWarning } from "react-icons/ci";
import axiosInstance from "../utils/axios/axios";
import { BsPatchCheck } from "react-icons/bs";
import PageTitle from "../utils/PageTitle";

const EventPage = () => {
  PageTitle("Jaiye - Book Event");

  const location = useLocation();
  console.log(location);
  const summary = location?.state?.event;
  const ticketTypes = summary?.ticketTypes || [];
  const eventDates = summary?.eventDates || [];

  const [selectedTicketType, setSelectedTicketType] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);

  // const handleTicketTypeClick = (ticketTypeId) => {
  //   setSelectedTicketType((prevType) => {
  //     // Clear selections when changing ticket types
  //     if (prevType !== ticketTypeId) {
  //       setSelectedDates([]);
  //     }
  //     return ticketTypeId;
  //   });
  // };

  const handleTicketTypeClick = (ticketTypeId, ticketClass) => {
    setSelectedTicketType((prevType) => {
      if (prevType !== ticketTypeId) {
        if (ticketClass === 0) {
          // If ticketClass is 0, select all dates
          setSelectedDates([...eventDates.map((date) => date.eventDateId)]);
        } else {
          // For other ticketClasses, clear selections
          setSelectedDates([]);
        }
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

  const [alert, setAlert] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [icon, setIcon] = useState("");
  const [response, setResponse] = useState("");
  const handleBooking = () => {
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

    console.log(url);
    console.log(data);

    axiosInstance
      .post(url, data)
      .then((res) => {
        setAlert(!alert);
        setBgColor("green");
        setIcon(<BsPatchCheck />);
        setResponse(res.data.message);
      })
      .catch((err) => {
        setAlert(!alert);
        setBgColor("red");
        setIcon(<CiWarning />);
        setResponse(err?.data?.message || err?.message);
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
      <p>{summary?.description}</p>
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
              } px-4 py-2 text-center border border-primary grid place-content-center`}
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
                      className={`border h-10 text-center border-primary grid place-content-center ${
                        selectedDates.includes(eventDate.eventDateId)
                          ? "bg-primary text-white"
                          : "bg-white text-primary"
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
          <Button className="bg-primary" onClick={handleBooking}>
            Book Event
          </Button>
          {alert && (
            <Alert
              animate={{
                mount: { y: 0 },
                unmount: { y: 0 },
              }}
              color={bgColor}
              icon={icon}
              className="absolute w-11/12 right-5 h-12 top-8"
            >
              {response}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
