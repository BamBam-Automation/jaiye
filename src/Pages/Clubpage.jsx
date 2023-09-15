import React, { useState } from "react";
import { PiClockLight, PiUsersLight, PiWineLight } from "react-icons/pi";
import { TfiLocationArrow, TfiStar } from "react-icons/tfi";
import { HiPhone } from "react-icons/hi";
import { Button } from "@material-tailwind/react";
import { MdOutlineTableBar } from "react-icons/md";
import { BsTicketPerforated } from "react-icons/bs";
import PageTitle from "../utils/PageTitle";
import Accordion from "../components/Accordion";
import TimePicker from "../components/Timpicker";
import Tablepicker from "../components/Tablepicker";
import BarMap from "../images/Map.svg";
import NavBar from "../components/NavBar";
import { useLocation } from "react-router-dom";
import TimeConverter from "../components/TimeConverter";
import { Map, Marker } from "pigeon-maps";

const Clubpage = () => {
  // State to manage steps to book seats
  const [steps, setSteps] = useState(0);

  // State to manage the visibility of the table dropdown
  const [tableIsOpen, setTableIsOpen] = useState(false);

  // State to manage the visibility of the time picker
  const [timeIsOpen, setTimeIsOpen] = useState(false);

  // State to manage map visibility
  const [mapVisible, setMapVisible] = useState(false);

  const location = useLocation();
  console.log(location);
  const summary = location?.state?.club;

  // Sections for Accordion Component
  const sections = [
    {
      header: (
        <div className="space-y-3">
          <div className="flex gap-3 items-center">
            <MdOutlineTableBar className="text-primary h-5 w-5" />
            <h6 className="font-semibold">VIP Table</h6>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex gap-3 items-center">
              <BsTicketPerforated className="text-primary -rotate-45 h-5 w-5" />
              <p>2,000,000 Naira</p>
            </div>
            <div className="flex gap-3 items-center">
              <PiUsersLight className="text-primary h-5 w-5" />
              <p>5 Guests</p>
            </div>
          </div>
        </div>
      ),
      content: (
        <div className="space-y-3">
          <button
            className="text-primary text-sm"
            onClick={() => setMapVisible(!mapVisible)}
          >
            See tables map
          </button>
          <div className="relative space-y-7 pb-5">
            <div className="flex items-center gap-7 justify-between">
              <Button
                className="border-primary border-2 text-primary outline-none bg-transparent basis-1/2 flex items-center gap-1"
                onClick={() => setTimeIsOpen(!timeIsOpen)}
              >
                <PiClockLight className="h-5 w-5 text-primary" />
                Pick Time
              </Button>
              <Button
                className="border-primary border-2 text-primary outline-none bg-transparent basis-1/2"
                onClick={() => setTableIsOpen(!tableIsOpen)}
              >
                Select Table
              </Button>
            </div>
            <div
              className={`absolute w-1/2 h-40 rounded-lg py-3 shadow-lg overflow-y-scroll grid bg-white top-5 left-0 ${
                timeIsOpen
                  ? "transition ease-out duration-200 opacity-100 scale-100"
                  : "transition ease-in duration-200 opacity-0 scale-90"
              }`}
            >
              <TimePicker />
            </div>
            <div
              className={`absolute w-1/2 h-40 rounded-lg py-3 shadow-lg top-5 right-0 bg-white overflow-y-scroll ${
                tableIsOpen
                  ? "transition ease-out duration-200 opacity-100 scale-100"
                  : "transition ease-in duration-200 opacity-0 scale-90"
              }`}
            >
              <Tablepicker />
            </div>
            <div>
              <p>Fast track entry</p>
              <p>Bar spend as per minimum spend included.</p>
              <p>Designated hostess service.</p>
              <p>Our service has zero cost on client side.</p>
            </div>
            {mapVisible && <img className="mx-auto" src={BarMap} alt="" />}
          </div>
        </div>
      ),
    },
    {
      header: (
        <div className="space-y-3">
          <div className="flex gap-3 items-center">
            <MdOutlineTableBar className="text-primary h-5 w-5" />
            <h6 className="font-semibold">Special Table</h6>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex gap-3 items-center">
              <BsTicketPerforated className="text-primary -rotate-45 h-5 w-5" />
              <p>2,000,000 Naira</p>
            </div>
            <div className="flex gap-3 items-center">
              <PiUsersLight className="text-primary h-5 w-5" />
              <p>5 Guests</p>
            </div>
          </div>
        </div>
      ),
      content: "Content of section 2 goes here.",
    },
    {
      header: (
        <div className="space-y-3">
          <div className="flex gap-3 items-center">
            <MdOutlineTableBar className="text-primary h-5 w-5" />
            <h6 className="font-semibold">Regular Table</h6>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex gap-3 items-center">
              <BsTicketPerforated className="text-primary -rotate-45 h-5 w-5" />
              <p>2,000,000 Naira</p>
            </div>
            <div className="flex gap-3 items-center">
              <PiUsersLight className="text-primary h-5 w-5" />
              <p>5 Guests</p>
            </div>
          </div>
        </div>
      ),
      content: "Content of section 3 goes here.",
    },
  ];

  const clubSummary = (
    <div className="grid gap-3">
      <div className="">
        <h4 className="font-bold">About</h4>
        <p className="text-justify">{summary?.description}</p>
      </div>
      <div className="grid gap-3">
        <h4 className="font-bold">Location</h4>
        <p className="text-justify">{`${summary?.address}, ${summary?.state}, Nigeria`}</p>
        <div className="h-48 rounded-lg">
          <Map
            height={192}
            defaultCenter={[summary?.longitude, summary?.latitude]}
            defaultZoom={11}
          >
            <Marker
              width={50}
              anchor={[summary?.longitude, summary?.latitude]}
            />
          </Map>
        </div>
      </div>
    </div>
  );

  const accordion = (
    <div className="mt-5">
      <h4 className="text-2xl font-bold">Choose Seat</h4>
      <Accordion sections={sections} />
    </div>
  );

  const activeStep = () => {
    if (steps === 0) {
      return clubSummary;
    } else if (steps === 1) {
      return accordion;
    }
  };

  // Handle type of event place
  const clubType = (clubNumber) => {
    if (clubNumber === 1) {
      return "Unknown";
    } else if (clubNumber === 2) {
      return "Club";
    } else if (clubNumber === 3) {
      return "Bar";
    } else {
      return "Lounge";
    }
  };

  PageTitle("Jaiye - Book Table");
  return (
    <div className="p-7 grid gap-5 h-screen items-start">
      <div className="grid gap-3 items-start">
        <NavBar title={"Book Table"} />
        <div className="grid gap-5">
          <h4 className="text-2xl font-bold">{summary?.name}</h4>
          <img
            className="w-full object-cover rounded-lg h-36"
            src={summary?.imageUrl}
            alt="business banner"
          />
          <div className="grid gap-2">
            <div className="flex justify-between">
              <span className="flex">
                <PiWineLight className="h-5 w-5 text-primary" />
                <p>{clubType(summary?.establishmentType)}</p>
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
                <p>{TimeConverter(summary?.openingTime)}</p>
              </span>
            </div>
            <span className="flex">
              <HiPhone className="h-5 w-5 text-primary" />
              <p className="font-semibold">{summary?.contactPhone}</p>
            </span>
          </div>
        </div>
        {activeStep()}
      </div>
      <Button
        className="!self-end bg-primary !mb-36"
        onClick={() => setSteps(steps + 1)}
      >
        {steps === 0 ? "Select Table" : "Book Table"} <span>&#8594;</span>
      </Button>
    </div>
  );
};

export default Clubpage;
