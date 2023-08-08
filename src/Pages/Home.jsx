import React from "react";
import NavBar from "../components/NavBar";
import Input from "../components/Input";
import { CiSearch } from "react-icons/ci";
import HistoryCard from "../components/HistoryCard";
import ClubCard from "../components/ClubCard";
import Club from "../images/Club.jpg";
import Club2 from "../images/Club2.jpg";
import { Carousel } from "@material-tailwind/react";
import PageTitle from "../utils/PageTitle";
// import Club3 from "../images/Club3.jpg";

const Home = () => {
  // Page Title
  PageTitle("Jaiye - Your Dashboard");
  return (
    <div className="p-7 grid gap-5 items-start">
      <NavBar title={"Home"} />
      <div className="space-y-3">
        <p className="text-primary">Hello Emmanuel</p>
        <h4 className="font-semibold text-3xl">Explore the night!</h4>
        <div className="mb-5 sticky top-0">
          <Input type="search" id="search" label="Search" />
          <CiSearch className="absolute text-primary top-1 right-2 h-8 w-8" />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">Upcoming</p>
        <p className="text-primary">View All</p>
      </div>
      <HistoryCard />
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">Popular Places</p>
        <p className="text-primary">View All</p>
      </div>
      <Carousel transition={{ duration: 2 }} className="rounded-xl">
        <ClubCard
          img={Club}
          name={"Checkers Clubs"}
          type={"Club"}
          distance={"4.2Km"}
          rating={"4.5(42)"}
          time={"07:00PM"}
          //   state={!activeTab.includes("Clubs")}
        />
        <ClubCard
          img={Club2}
          name={"204's Place"}
          type={"Lounge"}
          distance={"4.2Km"}
          rating={"4.2(45)"}
          time={"07:00PM"}
          //   state={!activeTab.includes("Clubs")}
        />
      </Carousel>
    </div>
  );
};

export default Home;
