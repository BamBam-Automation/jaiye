import { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../utils/axios/axios";
import NavBar from "../components/NavBar";
import HistoryCard from "../components/HistoryCard";

const AllEvents = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 10;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get(
          `/events/bookings?pageIndex=${pageIndex}&pageSize=${pageSize}`
        );
        const newEvents = response.data.data;
        console.log(newEvents);
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
              key={event.ticketId}
              owner={event.eventName}
              //   guests={event.numberOfGuest}
              date={event.eventStartDate}
              //   time={TimeConverter(event.timeOfEvent)}
              //   table={event.tableNumber}
              //   price={event.eventPrice}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AllEvents;
