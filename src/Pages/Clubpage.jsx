import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import Club from "../images/Club.jpg";
import { PiClockLight, PiWineLight } from "react-icons/pi";
import { TfiLocationArrow, TfiStar } from "react-icons/tfi";
import { HiPhone } from "react-icons/hi";
import { Button } from "@material-tailwind/react";

const Clubpage = () => {
  return (
    <div className="p-7 grid gap-5 h-screen">
      <div className="flex font-semibold items-center justify-between">
        <div className="flex gap-5 items-center">
          <IoIosArrowBack className="h-5 w-5 text-primary" />
          <h6>Book Table</h6>
        </div>
        <FiMenu className="h-5 w-5 text-primary" />
      </div>
      <div className="grid gap-5">
        <h4 className="text-2xl font-bold">Checker's Club</h4>
        <img
          className="w-full object-cover rounded-lg h-36"
          src={Club}
          alt="business banner"
        />
        <div className="grid gap-2">
          <div className="flex justify-between">
            <span className="flex">
              <PiWineLight className="h-5 w-5 text-primary" />
              <p>Club</p>
            </span>
            <span className="flex">
              <TfiLocationArrow className="h-5 w-5 rotate-90 text-primary" />
              <p>2.6Km</p>
            </span>
            <span className="flex">
              <TfiStar className="h-5 w-5 text-primary" />
              <p>4.1(64)</p>
            </span>
            <span className="flex">
              <PiClockLight className="h-5 w-5 text-primary" />
              <p>09:00PM</p>
            </span>
          </div>
          <span className="flex">
            <HiPhone className="h-5 w-5 text-primary" />
            <p>08012345678</p>
          </span>
        </div>
      </div>
      <div>
        <h4 className="font-bold">About</h4>
        <p className="text-justify">
          Welcome to our vibrant and electrifying nightclub, where the night
          comes alive and unforgettable experiences await you at every turn. We
          pride ourselves on creating an atmosphere that ignites the senses,
          offering a unique fusion of music, dance, and entertainment that will
          leave you craving for more.
        </p>
      </div>
      <div>
        <h4 className="font-bold">Location</h4>
        <p className="text-justify">
          26, Lekki beach road, Lekki Phase 1, Lagos Nigeria
        </p>
        <div className="h-48 bg-secondary rounded-lg"></div>
      </div>
      <Button className="self-end bg-primary">
        Select Table <span>&#8594;</span>
      </Button>
    </div>
  );
};

export default Clubpage;
