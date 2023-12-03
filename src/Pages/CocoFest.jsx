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
  const [cocoFest, setCocoFest] = useState({});
  useEffect(() => {
    axiosInstance
      .get("events?pageNumber=1&pageSize=10")
      .then((res) => {
        setCocoFest(res.data.data[0]);
        setEvents(res.data.data);
        setDates(res.data.data[0].eventDates);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  // console.log(cocoFest);
  PageTitle("Jaiye - CocoFest Festival");

  return (
    <div className="p-7 grid gap-5 items-start">
      <div className="space-y-5">
        <NavBar title={`${cocoFest.shortCode} Festival`} />
        <p className="font-bold text-2xl">{cocoFest.description}</p>
      </div>
      <Carousel loop={true} transition={{ duration: 2 }} className="rounded-xl">
        <img
          key={cocoFest.establishmentId}
          src={cocoFest.imageUrls}
          onClick={() => navigate("/events", { state: { event: cocoFest } })}
          alt="event-banner"
        />
      </Carousel>
      <PrimaryButton
        onClick={() => navigate("/events", { state: { event: cocoFest } })}
        text="Book Event"
      />
    </div>
  );
};

export default CocoFest;
