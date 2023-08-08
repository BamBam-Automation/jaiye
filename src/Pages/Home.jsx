import React from "react";
import NavBar from "../components/NavBar";
import Input from "../components/Input";
import { CiSearch } from "react-icons/ci";
import HistoryCard from "../components/HistoryCard";

const Home = () => {
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
    </div>
  );
};

export default Home;
