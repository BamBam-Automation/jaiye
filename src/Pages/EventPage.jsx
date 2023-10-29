import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";

const EventPage = () => {
  const location = useLocation();
  const summary = location?.state?.event;
  const eventDates = summary?.eventDates || [];
  const ticketTypes = summary?.ticketTypes || [];

  const [selectedDates, setSelectedDates] = useState([]);
  const handleDateChange = (eventDateId) => {
    if (selectedDates.includes(eventDateId)) {
      // If the date is already selected, remove it from the selected dates.
      setSelectedDates(
        selectedDates.filter((dateId) => dateId !== eventDateId)
      );
    } else {
      // If the date is not selected, add it to the selected dates.
      setSelectedDates([...selectedDates, eventDateId]);
    }
  };

  const [selectedTickets, setSelectedTickets] = useState([]);
  const [ticketQuantities, setTicketQuantities] = useState({}); // Track ticket quantities

  const handleTicketChange = (ticketTypeId) => {
    setSelectedTickets((prevSelectedTickets) => {
      if (prevSelectedTickets.includes(ticketTypeId)) {
        // If the ticket is already selected, remove it from the selected tickets.
        // Also, remove the associated quantity input from the state.
        setTicketQuantities((prevQuantities) => {
          const { [ticketTypeId]: removed, ...newQuantities } = prevQuantities;
          return newQuantities;
        });
        return prevSelectedTickets.filter(
          (ticketId) => ticketId !== ticketTypeId
        );
      } else {
        // If the ticket is not selected, add it to the selected tickets.
        // Add an initial quantity of 1 for this ticket type.
        setTicketQuantities((prevQuantities) => ({
          ...prevQuantities,
          [ticketTypeId]: 1,
        }));
        return [...prevSelectedTickets, ticketTypeId];
      }
    });
  };

  const handleQuantityChange = (ticketTypeId, newQuantity) => {
    setTicketQuantities((prevQuantities) => ({
      ...prevQuantities,
      [ticketTypeId]: newQuantity,
    }));
  };

  return (
    <div className="p-7 grid gap-5 items-start">
      <NavBar title={summary?.name} />
      <p>{summary?.description}</p>
      <div className="space-y-3">
        <p className="font-semibold text-lg text-primary">Event Date(s)</p>
        <p>Select Date(s) below:</p>
        <div className="grid gap-5">
          {eventDates.map((eventDate) => (
            <label
              className={`border ${
                selectedDates.includes(eventDate.eventDateId)
                  ? "bg-primary text-white"
                  : "bg-white text-primary"
              } h-10 text-center border border-primary grid place-content-center rounded shadow-xl`}
              key={eventDate.eventDateId}
            >
              <input
                type="checkbox"
                value={eventDate.eventDateId}
                checked={selectedDates.includes(eventDate.eventDateId)}
                onChange={() => handleDateChange(eventDate.eventDateId)}
                style={{ display: "none" }}
              />
              {eventDate.date}
            </label>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <p className="font-semibold text-lg text-primary">Event Ticket Types</p>
        <p>Select Ticket Type below:</p>
        <div className="grid gap-5">
          {ticketTypes.map((ticketType) => (
            <div
              key={ticketType.ticketTypeId}
              className={`${
                selectedTickets.includes(ticketType.ticketTypeId)
                  ? "bg-primary text-white"
                  : "bg-white text-primary"
              } px-4 py-2 text-center border border-primary grid place-content-center rounded shadow-xl`}
            >
              <label>
                <input
                  type="checkbox"
                  value={ticketType.ticketTypeId}
                  checked={selectedTickets.includes(ticketType.ticketTypeId)}
                  onChange={() => handleTicketChange(ticketType.ticketTypeId)}
                  style={{ display: "none" }}
                />
                {ticketType.name}
              </label>
              {selectedTickets.includes(ticketType.ticketTypeId) && (
                <input
                  type="number"
                  className="rounded bg-white/30"
                  placeholder="Quanity"
                  value={ticketQuantities[ticketType.ticketTypeId] || 1}
                  onChange={(e) =>
                    handleQuantityChange(
                      ticketType.ticketTypeId,
                      parseInt(e.target.value, 10)
                    )
                  }
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
