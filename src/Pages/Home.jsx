import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Input from "../components/Input";
import { CiSearch } from "react-icons/ci";
import HistoryCard from "../components/HistoryCard";
import ClubCard from "../components/ClubCard";
import { Carousel } from "@material-tailwind/react";
import PageTitle from "../utils/PageTitle";
import axiosInstance from "../utils/axios/axios";
import { Link, useNavigate } from "react-router-dom";
import TimeConverter from "../components/TimeConverter";
import DateConverter from "../components/DateConverter";

const Home = () => {
  // Page Title
  PageTitle("Jaiye - Your Dashboard");

  // Get Current Username
  let username = sessionStorage.getItem("username");

  // Get the top 5 user booked events
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axiosInstance
      .get(`/upcoming-event?pageIndex=1&pageSize=5`)
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Get top 5 clubs
  const [clubs, setClubs] = useState([]);
  useEffect(() => {
    axiosInstance
      .get(`/establishments?pageIndex=1&pageSize=10`)
      .then((res) => {
        setClubs(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  // Get details of single event place for customer booking
  const navigate = useNavigate();
  const getSingleClub = (arg) => {
    axiosInstance
      .get(`/establishment/${arg}`)
      .then((res) => {
        navigate("/club", { state: { club: res.data } });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const [eventCenter, setEventCenter] = useState({});

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
        <p className="font-semibold text-lg">Reservations</p>
        <Link to={"/history"} className="text-primary">
          View All
        </Link>
      </div>
      {events.length === 0 ? (
        <p className="mx-auto text-center text-2xl font-semibold text-primary">
          You have no active reservations
        </p>
      ) : (
        <Carousel
          loop={true}
          transition={{ duration: 2 }}
          className="rounded-xl"
        >
          {events.map((event) => (
            <HistoryCard
              key={event.id}
              owner={event.owner}
              guests={event.numberOfGuest}
              date={DateConverter(event.dateOfEvent)}
              time={TimeConverter(event.timeOfEvent)}
              table={event.tableNumber}
              price={event.eventPrice}
            />
          ))}
        </Carousel>
      )}
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">Popular Places</p>
        <Link to={"/explore"} className="text-primary">
          View All
        </Link>
      </div>
      <Carousel autoplay={true} loop={true} className="rounded-xl">
        {clubs.map((club) => (
          <ClubCard
            key={club.id}
            img={club.imageUrl}
            name={club.name}
            type={clubType(club.establishmentType)}
            distance={"4.2Km"}
            rating={"4.5(42)"}
            time={TimeConverter(club.openingTime)}
            //   state={!activeTab.includes("Clubs")}
            onClick={() => getSingleClub(club.id)}
          />
        ))}
      </Carousel>
    </div>
  );
};

export default Home;
