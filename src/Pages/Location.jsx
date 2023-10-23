import React, { useState } from "react";
import Img from "../images/Location.svg";
import ImgTwo from "../images/Search.svg";
import AllStates from "../utils/statesAndCities.json";
import { Button } from "@material-tailwind/react";
import Input from "../components/Input";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import PaystackPop from "@paystack/inline-js";

const Location = () => {
  const [search, setSearch] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  const handleChange = (e) => {
    setSearch(!search);
    const selectedState = e.target.value;
    setSelectedCities(selectedState);
    const stateData = AllStates.find((state) => state.name === selectedState);
    setFilteredCities(stateData?.cities || []);
  };

  const handleSearchChange = (e) => {
    const input = e.target.value;
    setSearchQuery(input);
    const filtered = selectedCities.filter((city) =>
      city.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredCities(filtered);
  };

  const navigate = useNavigate();
  const [eventCity, setEventCity] = useState("");
  const handleCityClick = (city) => {
    // console.log("Selecte City:", city);
    setEventCity(city);
  };

  // Navigate to "Explore" page and filter with the vale of eventCity
  const viewEvents = () => {
    if (eventCity !== "") {
      // const paystack = new PaystackPop();
      // paystack.newTransaction({
      //   key: "pk_test_b6dad8eb9616b4f29b0a2a4a3918636326e9870d",
      //   amount: "500",
      //   email: "a@a.com",
      //   firstname: "testing",
      //   lastname: "more",
      //   onSuccess(transaction) {
      //     console.log(transaction);
      //     let message = `Payment Complete!!! Reference ${transaction.reference}`;
      //     alert(message);
      //   },
      //   onCancel() {
      //     alert("Transanction Cancelled");
      //   },
      // });
      navigate("/explore", { state: { city: eventCity } });
    } else {
      return;
    }
  };

  return (
    <div className="grid relative p-7 h-screen overflow-y-scroll">
      {!search && (
        <img
          className="absolute left-0 bottom-12 animate-bounce"
          src={Img}
          alt=""
        />
      )}
      {search && (
        <img
          className="fixed right-0 top-1/4 animate-bounce"
          src={ImgTwo}
          alt=""
        />
      )}
      {!search && (
        <div className="grid">
          <div className="flex flex-col items-center mt-56">
            <h3 className="text-5xl font-bold">Location</h3>
            <h6 className="font-medium text-[#afafaf]">Explore the Nights</h6>
          </div>
          <div className="bg-gradient-to-b h-11 rounded-lg relative from-[#EB7C4C] to-[#A03484] p-0.5">
            <select
              className="focus:outline-none focus:border-none focus:ring-0 placeholder-transparent peer bg-[#F9F9F9] w-full h-10 px-4 rounded"
              name="states"
              id="states"
              onChange={handleChange}
            >
              <option className="block peer-focus:hidden" value="">
                State
              </option>
              {AllStates.map((state) => (
                <option className="mx-4" key={state.name} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
            <label
              className="absolute text-base hidden -top-3 left-4 px-1 text-[#EB7C4C] bg-[#f9f9f9] peer-focus:block peer-focus:text-base peer-focus:-top-3 peer-focus:left-4 peer-focus:px-1 peer-focus:bg-[#F9F9F9] transition-all"
              htmlFor="states"
            >
              State
            </label>
          </div>
        </div>
      )}
      {search && (
        <div className="grid gap-3">
          <div className="mb-5 sticky top-0">
            <Input
              type="search"
              id="search"
              value={searchQuery}
              onChange={handleSearchChange}
              label="Search City"
            />
            <CiSearch className="absolute text-primary top-1 right-2 h-8 w-8" />
          </div>
          {filteredCities.map(
            (
              city // Use filteredCities instead of selectedCities
            ) => (
              <p
                key={city}
                className="h-12 border-l-4 flex items-center px-4 py-3 hover:text-primary hover:border-secondary font-semibold"
                onClick={() => handleCityClick(city)}
              >
                {city}
              </p>
            )
          )}
        </div>
      )}
      <div className="self-end flex w-full sticky bottom-0">
        {search && (
          <Button
            onClick={() => setSearch(!search)}
            className="bg-[#F9F9F9] mx-auto text-primary"
          >
            <span>&#8592;</span> Back
          </Button>
        )}
        <Button
          className={
            search
              ? `bg-primary mx-auto self-end`
              : `bg-primary w-full self-end`
          }
          onClick={viewEvents}
        >
          Next <span>&#8594;</span>
        </Button>
      </div>
    </div>
  );
};

export default Location;
