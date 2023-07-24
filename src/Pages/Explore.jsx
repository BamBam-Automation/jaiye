import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import Input from "../components/Input";
import { CiSearch } from "react-icons/ci";
import { GoFilter } from "react-icons/go";
import ClubCard from "../components/ClubCard";
import Club from "../images/Club.jpg";
import Club2 from "../images/Club2.jpg";
import { Button } from "@material-tailwind/react";

const Explore = () => {
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
      <ClubCard
        img={Club}
        name={"Checkers Clubs"}
        type={"Club"}
        distance={"4.2Km"}
        rating={"4.5(42)"}
        time={"07:00PM"}
      />
      <ClubCard
        img={Club2}
        name={"204's Place"}
        type={"Lounge"}
        distance={"4.2Km"}
        rating={"4.2(45)"}
        time={"07:00PM"}
      />
      <ClubCard
        img={Club2}
        name={"204's Place"}
        type={"Lounge"}
        distance={"4.2Km"}
        rating={"4.2(45)"}
        time={"07:00PM"}
      />
      <Button className="text-primary bg-transparent border border-primary mx-auto">
        See More <span>&#8594;</span>
      </Button>
    </div>
  );
};

export default Explore;
