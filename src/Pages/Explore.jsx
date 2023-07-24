import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Input from "../components/Input";
import { CiSearch } from "react-icons/ci";
import { GoFilter } from "react-icons/go";
import ClubCard from "../components/ClubCard";
import Club from "../images/Club.jpg";
import Club2 from "../images/Club2.jpg";
import Club3 from "../images/Club3.jpg";
import { Button } from "@material-tailwind/react";

const Explore = () => {
  // What's On  || Clubs || Bars
  const barType = ["What's On", "Clubs", "Bars"];

  const [activeTab, setActiveTab] = useState(barType[0]);

  // Get Current Date
  const date = new Date();
  const day = date.toLocaleDateString("en-US", { weekday: "long" });
  const dayDate = date.toLocaleDateString("en-US", { day: "numeric" });
  const month = date.toLocaleDateString("en-us", { month: "long" });
  return (
    <div className="grid gap-5 relative content-start p-7 h-screen overflow-y-scroll">
      <div className="flex justify-between items-baseline">
        <IoIosArrowBack className="h-5 w-5 text-primary" />
        <div className="mb-5 sticky top-0">
          <Input type="search" id="search" label="Search" />
          <CiSearch className="absolute text-primary top-1 right-2 h-8 w-8" />
        </div>
        <GoFilter className="h-5 w-5 text-primary" />
      </div>
      <div className="h-11 flex justify-around">
        {barType.map((bar) => (
          <p
            onClick={() => setActiveTab(bar)}
            className={
              activeTab === bar
                ? // ? "border-b-4 p-3 border-primary text-primary"
                  "bg-gradient-to-r from-[#EB7C4C] to-[#A03484] transition ease-in-out duration-700 border-primary/70 border-b-4 p-3 font-semibold bg-clip-text text-transparent"
                : "border-b p-3"
            }
            key={bar}
          >
            {bar}
          </p>
        ))}
      </div>
      <p className="font-bold text-2xl">{`${day} ${dayDate}, ${month}`}</p>
      <ClubCard
        img={Club}
        name={"Checkers Clubs"}
        type={"Club"}
        distance={"4.2Km"}
        rating={"4.5(42)"}
        time={"07:00PM"}
        state={activeTab.includes("Clubs")}
      />
      <ClubCard
        img={Club2}
        name={"204's Place"}
        type={"Lounge"}
        distance={"4.2Km"}
        rating={"4.2(45)"}
        time={"07:00PM"}
        state={activeTab.includes("Clubs")}
      />
      <ClubCard
        img={Club3}
        name={"204's Place"}
        type={"Lounge"}
        distance={"4.2Km"}
        rating={"4.2(45)"}
        time={"07:00PM"}
        state={activeTab.includes("Clubs")}
      />
      <Button className="text-primary bg-transparent border border-primary mx-auto">
        See More <span>&#8594;</span>
      </Button>
    </div>
  );
};

export default Explore;
