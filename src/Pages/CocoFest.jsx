import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axiosInstance from "../utils/axios/axios";
import { Carousel } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import PageTitle from "../utils/PageTitle";

const CocoFest = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [dates, setDates] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("events?pageNumber=1&pageSize=10")
      .then((res) => {
        console.log(res.data.data[0].eventDates);
        setEvents(res.data.data);
        setDates(res.data.data[0].eventDates);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  PageTitle("Jaiye - CocoFest Festival");

  return (
    <div className="p-7 grid gap-5 items-start">
      {events.map((event) => (
        <div className="space-y-5" key={event.establishmentId}>
          <NavBar title={`${event.shortCode} Festival`} />
          <p className="font-bold text-2xl">{event.description}</p>
        </div>
      ))}
      <Carousel loop={true} transition={{ duration: 2 }} className="rounded-xl">
        {events.map((event) => (
          <img
            key={event.establishmentId}
            src={event.imageUrls}
            onClick={() => navigate("/events", { state: { event: event } })}
            alt="event-banner"
          />
        ))}
      </Carousel>
      {/* <p className="font-semibold text-lg text-primary">Event Dates:</p>
      {dates.map((date, index) => (
        <div className="grid" key={index}>
          <p className="bg-primary/70 mx-auto w-2/3 grid place-content-center text-white/90 h-10 rounded">
            {date.date}
          </p>
        </div>
      ))} */}
      <PrimaryButton
        onClick={() => navigate("/events", { state: { event: events[0] } })}
        text="Book Event"
      />
    </div>
  );
};

export default CocoFest;
