import React from "react";
import NavBar from "../components/NavBar";
import HistoryCard from "../components/HistoryCard";
import { useEffect } from "react";
import axiosInstance from "../utils/axios/axios";
import { useState } from "react";
import DateConverter from "../components/DateConverter";
import TimeConverter from "../components/TimeConverter";

const History = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 10;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get(
          `/upcoming-event?pageIndex=${pageIndex}&pageSize=${pageSize}`
        );
        const newEvents = response.data;
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

  return (
    <div className="p-7 grid gap-5 items-start">
      <NavBar title={"History"} />
      <div className="mt-10 grid gap-5">
        {events.length === 0 ? (
          <p className="mx-auto text-center text-2xl font-semibold text-primary">
            You have no active reservations
          </p>
        ) : (
          events.map((event) => (
            <HistoryCard
              key={event.id}
              owner={event.owner}
              guests={event.numberOfGuest}
              date={DateConverter(event.dateOfEvent)}
              time={TimeConverter(event.timeOfEvent)}
              table={event.tableNumber}
              price={event.eventPrice}
            />
          ))
        )}
      </div>
      <button
        // variant="outlined"
        className={`text-primary h-full border border-primary mx-auto rounded-md py-3 px-4`}
        onClick={moreHistory}
      >
        See More <span>&#8594;</span>
      </button>
    </div>
  );
};

export default History;
