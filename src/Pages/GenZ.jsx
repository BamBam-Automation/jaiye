import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axiosInstance from "../utils/axios/axios";
import { Carousel } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";
import PageTitle from "../utils/PageTitle";

const GenZ = () => {
  const navigate = useNavigate();
  const [cocoFest, setCocoFest] = useState({});
  useEffect(() => {
    axiosInstance
      .get("events?pageNumber=1&pageSize=10")
      .then((res) => {
        // console.log(res.data.data[1]);
        setCocoFest(res.data.data[1]);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  // console.log(cocoFest);
  PageTitle("Jaiye - CocoFest Festival");

  const summaryProceed = () => {
    navigate("/genZEventSummary", { state: { event: cocoFest } });
  };

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
          onClick={summaryProceed}
          alt="event-banner"
        />
      </Carousel>
      <PrimaryButton onClick={summaryProceed} text="Book Event" />
    </div>
  );
};

export default GenZ;
