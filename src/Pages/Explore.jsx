import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Input from "../components/Input";
import { CiSearch } from "react-icons/ci";
import { GoFilter } from "react-icons/go";
import ClubCard from "../components/ClubCard";
import Club from "../images/Club.jpg";
import Club2 from "../images/Club2.jpg";
import Club3 from "../images/Club3.jpg";
import { Button, Drawer } from "@material-tailwind/react";
import { PiCheck } from "react-icons/pi";
import { RxStarFilled } from "react-icons/rx";
import { GrClose } from "react-icons/gr";
import PageTitle from "../utils/PageTitle";

const Explore = () => {
  // Page Title
  PageTitle("Jaiye - Explore Clubs, Bars & Lounges");

  // What's On  || Clubs || Bars
  const barType = ["What's On", "Clubs", "Bars"];
  // Select Active barType
  const [activeTab, setActiveTab] = useState(barType[0]);

  // Bar Categories
  const categries = ["Clubs", "Bars", "Pubs", "Lounge"];
  const [activeCategory, setActiveCategory] = useState("");

  // Bar Ratings
  const ratings = ["5 Stars", "4 Stars", "3 Stars", "2 Stars"];

  // Get Current Date
  const date = new Date();
  const day = date.toLocaleDateString("en-US", { weekday: "long" });
  const dayDate = date.toLocaleDateString("en-US", { day: "numeric" });
  const month = date.toLocaleDateString("en-us", { month: "long" });

  // Manage Filter Drawer
  const [drawerState, setDrawerState] = useState(false);
  return (
    <div className="grid gap-5 relative content-start p-7 h-screen overflow-y-scroll">
      <div className="flex justify-between items-baseline">
        <IoIosArrowBack className="h-5 w-5 text-primary" />
        <div className="mb-5 sticky top-0">
          <Input type="search" id="search" label="Search" />
          <CiSearch className="absolute text-primary top-1 right-2 h-8 w-8" />
        </div>
        <GoFilter
          className="h-5 w-5 text-primary"
          onClick={() => setDrawerState(!drawerState)}
        />
      </div>
      <div className="h-11 flex justify-around">
        {barType.map((bar) => (
          <p
            onClick={() => setActiveTab(bar)}
            className={
              activeTab === bar
                ? "bg-gradient-to-r from-[#EB7C4C] to-[#A03484] transition ease-in-out duration-700 border-primary/70 border-b-4 p-3 font-semibold bg-clip-text text-transparent"
                : "border-b p-3"
            }
            key={bar}
          >
            {bar}
          </p>
        ))}
      </div>
      {drawerState && (
        <div className="fixed w-screen h-full left-0 z-20 overflow-scroll">
          <Drawer
            placement="top"
            open={drawerState}
            onClose={() => setDrawerState(!drawerState)}
            className={drawerState === true ? "block top-0 fixed" : "hidden"}
          >
            <div className="p-7 bg-white grid gap-20 rounded-b-xl">
              <div className="grid gap-10">
                <GrClose
                  className="justify-self-end"
                  onClick={() => setDrawerState(!drawerState)}
                />
                <div className="grid gap-3">
                  <h5 className="font-medium">Categories</h5>
                  <div className="flex justify-between">
                    {categries.map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={
                          activeCategory === category
                            ? "bg-primary text-white rounded-full px-3 py-1 flex gap-1 items-center transition-all ease-in-out duration-300"
                            : "border-primary bg-transparent text-primary border rounded-full px-3 py-1"
                        }
                      >
                        {category}
                        {activeCategory === category ? (
                          <PiCheck className="text-white h-7" />
                        ) : (
                          ""
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <label htmlFor="distance">
                  <h5 className="font-medium">Distance</h5>
                  <input
                    className="w-full h-[1px] cursor-pointer"
                    min={5}
                    max={200}
                    step={2}
                    type="range"
                    name="distance"
                    id="distance"
                  />
                </label>
                <div className="grid gap-3">
                  <h6>Table Price</h6>
                  <div className="flex gap-3">
                    <label className="" htmlFor="minimum">
                      <Input />
                      <p className="text-center">Minimum</p>
                    </label>
                    <span className="w-6 h-[3px] mt-5 bg-primary"></span>
                    <label htmlFor="maximum">
                      <Input />
                      <p className="text-center">Maximum</p>
                    </label>
                  </div>
                </div>
                <div className="grid gap-3">
                  <h6>Rating</h6>
                  <div className="flex justify-between">
                    {ratings.map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setActiveCategory(rating)}
                        className={
                          activeCategory === rating
                            ? "bg-primary text-white rounded-full px-3 py-1 flex gap-1 items-center transition-all ease-in-out duration-300"
                            : "border-primary bg-transparent text-primary border rounded-full px-3 py-1"
                        }
                      >
                        {activeCategory === rating ? (
                          <RxStarFilled className="text-secondary h-7" />
                        ) : (
                          ""
                        )}
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <Button className="bg-primary mx-auto">Save Filter</Button>
            </div>
          </Drawer>
        </div>
      )}
      <p className="font-bold text-2xl">{`${day} ${dayDate}, ${month}`}</p>
      <ClubCard
        img={Club}
        name={"Checkers Clubs"}
        type={"Club"}
        distance={"4.2Km"}
        rating={"4.5(42)"}
        time={"07:00PM"}
        state={!activeTab.includes("Clubs")}
      />
      <ClubCard
        img={Club2}
        name={"204's Place"}
        type={"Lounge"}
        distance={"4.2Km"}
        rating={"4.2(45)"}
        time={"07:00PM"}
        state={!activeTab.includes("Clubs")}
      />
      <ClubCard
        img={Club3}
        name={"204's Place"}
        type={"Lounge"}
        distance={"4.2Km"}
        rating={"4.2(45)"}
        time={"07:00PM"}
        state={!activeTab.includes("Clubs")}
      />
      <Button
        variant="outlined"
        className="text-primary h-full border border-primary mx-auto"
      >
        See More <span>&#8594;</span>
      </Button>
    </div>
  );
};

export default Explore;