import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Input from "../components/Input";
import { CiSearch } from "react-icons/ci";
import { GoFilter } from "react-icons/go";
import ClubCard from "../components/ClubCard";
import { Button, Drawer } from "@material-tailwind/react";
import { PiCheck } from "react-icons/pi";
import { RxStarFilled } from "react-icons/rx";
import { GrClose } from "react-icons/gr";
import PageTitle from "../utils/PageTitle";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from "../utils/axios/axios";

const Explore = () => {
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location);

  const previousPage = (e) => {
    navigate(-1);
  };

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

  // Collect and show summaries of Event Places and their types
  const [clubs, setClubs] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 10;
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axiosInstance.get(
          `/establishments?pageIndex=${pageIndex}&pageSize=${pageSize}`
        );
        const newClubs = response.data;
        console.log(newClubs);
        // Append the new clubs to the existing list
        setClubs((prevClubs) => [...prevClubs, ...newClubs]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchClubs();
  }, [pageIndex]);

  // Function to load more clubs when the "See More" button is clicked
  const loadMoreClubs = () => {
    setPageIndex(pageIndex + 1);
  };

  // Convert Establishment type from Number to Text
  const clubType = (clubNumber) => {
    switch (clubNumber) {
      case 1:
        return "Pubs";
      case 2:
        return "Club";
      case 3:
        return "Bar";
      case 4:
        return "Lounge";
      default:
        "";
    }
  };

  // Filter "clubs" state based on establismentType on ActiveBar
  const [filteredClubs, setFilteredClubs] = useState(clubs);
  useEffect(() => {
    let clubsToDisplay;

    if (activeTab === "What's On") {
      // Return all clubs, no filtering needed
      clubsToDisplay = clubs;
    } else if (activeTab === "Clubs") {
      // Filter clubs with establishmentType === 2 (assuming 2 represents Clubs)
      clubsToDisplay = clubs.filter((club) => club.establishmentType === 2);
    } else {
      // Filter clubs with establishmentType === 3 (assuming 3 represents Bars)
      clubsToDisplay = clubs.filter((club) => club.establishmentType === 3);
    }

    // Update the clubs state with the filtered result
    setFilteredClubs(clubsToDisplay);
  }, [activeTab, clubs]);

  // Request more information about a single Event center and pass the values for table booking
  const getSingleClub = (arg) => {
    axiosInstance
      .get(`/establishment/${arg}`)
      .then((res) => {
        console.log(res);
        navigate("/club", { state: { club: res.data } });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Collect Data for Drawer dropdown
  const [filterData, setFilterData] = useState({
    category: activeCategory,
    minPrice: "",
    maxPrice: "",
  });

  // Converting activeCategory for filter use
  const estType = (arg) => {
    switch (arg) {
      case "Pubs":
        return 1;
      case "Clubs":
        return 2;
      case "Bars":
        return 3;
      case "Lounge":
        return 4;
      default:
        "";
    }
  };

  // Update filterData.category when activeCategory changes
  useEffect(() => {
    setFilterData((prevFilterData) => ({
      ...prevFilterData,
      category: estType(activeCategory),
    }));
  }, [activeCategory]);

  // const [dropFilter, setDropFilter] = useState(clubs);
  const [filterButton, setFilterButton] = useState("Save Filter");
  const drawerFilter = () => {
    let result;
    if (filterButton === "Save Filter") {
      result = clubs.filter(
        (club) => club.establishmentType === filterData.category
      );
      setFilteredClubs(result);
      setFilterButton("Clear Filter");
    } else {
      setActiveCategory("");
      setFilterData({ category: "", minPrice: "", maxPrice: "" });
      setFilteredClubs(clubs);
      setFilterButton("Save Filter");
    }
  };

  return (
    <div className="grid gap-5 relative content-start p-7 h-screen overflow-y-scroll">
      <div className="flex justify-between items-baseline">
        <IoIosArrowBack
          className="h-5 w-5 text-primary"
          onClick={previousPage}
        />
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
                      <label
                        key={category}
                        className="flex items-center space-x-1"
                      >
                        <input
                          type="radio"
                          name="category"
                          value={activeCategory}
                          checked={activeCategory === category}
                          onChange={() => setActiveCategory(category)}
                          className="sr-only" // Hide the default radio button
                        />
                        <div
                          className={`cursor-pointer rounded-full px-3 py-1 flex items-center ${
                            activeCategory === category
                              ? "bg-primary text-white"
                              : "border-primary bg-transparent text-primary border"
                          }`}
                        >
                          {category}
                          {activeCategory === category && (
                            <PiCheck className="text-white h-7 ml-2" />
                          )}{" "}
                        </div>
                      </label>
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
                      <Input
                        value={filterData.minPrice}
                        onChange={(e) =>
                          setFilterData({
                            ...filterData,
                            minPrice: e.target.value,
                          })
                        }
                      />
                      <p className="text-center">Minimum</p>
                    </label>
                    <span className="w-6 h-[3px] mt-5 bg-primary"></span>
                    <label htmlFor="maximum">
                      <Input
                        value={filterData.maxPrice}
                        onChange={(e) =>
                          setFilterData({
                            ...filterData,
                            maxPrice: e.target.value,
                          })
                        }
                      />
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
              <Button onClick={drawerFilter} className="bg-primary mx-auto">
                {filterButton}
              </Button>
            </div>
          </Drawer>
        </div>
      )}
      <p className="font-bold text-2xl">{`${day} ${dayDate}, ${month}`}</p>
      <div className="mt-10 grid gap-5">
        {filteredClubs.map((club) => (
          <ClubCard
            key={club.id}
            img={club.imageUrl}
            name={club.name}
            type={clubType(club.establishmentType)}
            distance={"4.2Km"}
            rating={"4.5(42)"}
            time={"07:00PM"}
            state={
              activeCategory !== "Clubs" ? !activeTab.includes("Clubs") : ""
            }
            onClick={() => {
              getSingleClub(club.id);
            }}
          />
        ))}
      </div>
      <button
        // variant="outlined"
        className={`text-primary h-full border border-primary mx-auto rounded-md py-3 px-4`}
        onClick={loadMoreClubs}
      >
        See More <span>&#8594;</span>
      </button>
    </div>
  );
};

export default Explore;
