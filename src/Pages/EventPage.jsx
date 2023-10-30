import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";

const EventPage = () => {
  const location = useLocation();
  const summary = location?.state?.event;
  console.log(summary);
  const ticketTypes = summary?.ticketTypes || [];
  const eventDates = summary?.eventDates || [];

  const [selectedTicketType, setSelectedTicketType] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);

  const handleTicketTypeClick = (ticketTypeId) => {
    setSelectedTicketType((prevType) => {
      // Clear selections when changing ticket types
      if (prevType !== ticketTypeId) {
        setSelectedDates([]);
      }
      return ticketTypeId;
    });
  };

  const handleDateClick = (eventDateId) => {
    setSelectedDates((prevDates) => {
      // Check if the date is already selected
      if (prevDates.includes(eventDateId)) {
        // If selected, unselect it
        return prevDates.filter((date) => date !== eventDateId);
      } else {
        // If not selected, check if it's within the valid limit
        const selectedTicket = ticketTypes.find(
          (type) => type.ticketTypeId === selectedTicketType
        );
        if (selectedTicket && prevDates.length < selectedTicket.validDays) {
          // Select the date if within the limit
          return [...prevDates, eventDateId];
        } else {
          // Otherwise, don't change the selection
          return prevDates;
        }
      }
    });
  };

  return (
    <div className="p-7 grid gap-5 items-start">
      <NavBar title={summary?.name} />
      <p>{summary?.description}</p>
      <div className="space-y-3">
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
              onClick={() => handleTicketTypeClick(ticketType.ticketTypeId)}
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
                      onClick={() => handleDateClick(eventDate.eventDateId)}
                    >
                      {eventDate.date}
                    </label>
                  ))}
                </div>
              )}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
