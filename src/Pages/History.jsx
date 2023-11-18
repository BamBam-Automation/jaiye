import React from "react";
import NavBar from "../components/NavBar";
// import HistoryCard from "../components/HistoryCard";
import { useEffect } from "react";
import axiosInstance from "../utils/axios/axios";
import { useState } from "react";
// import DateConverter from "../components/DateConverter";
// import TimeConverter from "../components/TimeConverter";
import PageTitle from "../utils/PageTitle";
import TicketCard from "../components/TicketCard";
import { useSelector } from "react-redux";
import QRCode from "react-qr-code";

const History = () => {
  PageTitle("Jaiye - All Booked Event Centers");
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 10;
  const [events, setEvents] = useState([]);

  const user = useSelector((state) => state.user.user.username);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get(
          `/events/bookings?pageIndex=${pageIndex}&pageSize=${pageSize}`
        );
        const newEvents = response.data.data;
        // Append the new clubs to the existing list
        setEvents((prevEvents) => [...prevEvents, ...newEvents]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvents();
  }, [pageIndex]);

  const moreHistory = () => {
    setPageIndex(pageIndex + 1);
  };

  const finalEncodedTicket = (arg) => {
    return JSON.stringify(arg);
  };

  const bgColor = "rgba(255, 255, 255, 0.0)";

  return (
    <div className="p-7 grid gap-5 items-start">
      <NavBar title={"History"} />
      {events.length === 0 ? (
        <p className="mx-auto text-center text-2xl font-semibold text-primary">
          You have no active reservations
        </p>
      ) : (
        ""
      )}
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {events.map((event) => (
          <TicketCard
            key={event.ticketId}
            user={user}
            event={event.ticketTypeName}
            details={event.reference}
          >
            <QRCode
              title={event.ticketTypeName}
              value={finalEncodedTicket(event.encodedTicket)}
              bgColor={bgColor}
            />
          </TicketCard>
        ))}
      </div>
      {events.length !== 0 ? (
        <button
          className={`text-primary h-full border border-primary mx-auto rounded-md py-3 px-4`}
          onClick={moreHistory}
        >
          See More <span>&#8594;</span>
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default History;
