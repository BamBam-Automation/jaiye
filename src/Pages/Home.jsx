import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Input from "../components/Input";
import { CiSearch } from "react-icons/ci";
import HistoryCard from "../components/HistoryCard";
import ClubCard from "../components/ClubCard";
import { Carousel } from "@material-tailwind/react";
import PageTitle from "../utils/PageTitle";
import axiosInstance from "../utils/axios/axios";
import { Link } from "react-router-dom";

const Home = () => {
  // Page Title
  PageTitle("Jaiye - Your Dashboard");

  let username = sessionStorage.getItem("username");

  const [events, setEvents] = useState([]);
  useEffect(() => {
    axiosInstance
      .get(`/upcoming-events?pageIndex=1&pageSize=5`)
      .then((res) => {
        console.log(res.data.$values);
        // setEvents(res.data.$values);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [clubs, setClubs] = useState([]);
  useEffect(() => {
    axiosInstance
      .get(`/establishments?pageIndex=1&pageSize=5`)
      .then((res) => {
        console.log(res.data.$values);
        setClubs(res.data.$values);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  return (
    <div className="p-7 grid gap-5 items-start">
      <NavBar title={"Home"} />
      <div className="space-y-3">
        <p className="text-primary">Hello {username.toUpperCase()}</p>
        <h4 className="font-semibold text-3xl">Explore the night!</h4>
        <div className="mb-5 sticky top-0">
          <Input type="search" id="search" label="Search" />
          <CiSearch className="absolute text-primary top-1 right-2 h-8 w-8" />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">Upcoming</p>
        <Link to={"/history"} className="text-primary">
          View All
        </Link>
      </div>
      <HistoryCard />
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">Popular Places</p>
        <Link to={"/explore"} className="text-primary">
          View All
        </Link>
      </div>
      <Carousel transition={{ duration: 2 }} className="rounded-xl">
        {clubs.map((club) => (
          <ClubCard
            key={club.$id}
            img={club.imageUrl}
            name={club.name}
            type={clubType(club.establishmentType)}
            distance={"4.2Km"}
            rating={"4.5(42)"}
            time={"07:00PM"}
            //   state={!activeTab.includes("Clubs")}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default Home;
