import React, { useState } from "react";
import Img from "../images/Location.svg";
import ImgTwo from "../images/Search.svg";
import AllStates from "../utils/statesAndCities.json";
import { Button } from "@material-tailwind/react";
import Input from "../components/Input";
import { CiSearch } from "react-icons/ci";

const Location = () => {
  const [search, setSearch] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);

  const handleChange = (e) => {
    setSearch(!search);
    const selectedState = e.target.value;
    console.log(selectedState);
    setSelectedCities(selectedState);

    // Find the selected states from AllStates data
    const stateData = AllStates.find((state) => state.name === selectedState);

    // Update the selectedCities with the cities of the selected state
    setSelectedCities(stateData?.cities || []);
    console.log(selectedCities);
  };
  return (
    <div className="grid relative p-7 h-screen overflow-y-scroll">
      {!search && (
        <img className="absolute left-0 bottom-12" src={Img} alt="" />
      )}
      {search && <img className="fixed right-0 top-1/4" src={ImgTwo} alt="" />}
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
          <div className="relative mb-5 sticky top-0 bg-">
            <Input type="search" id="search" label="Search City" />
            <CiSearch className="absolute text-primary top-1 right-2 h-8 w-8" />
          </div>
          {selectedCities.map((city) => (
            <p
              key={city}
              className="h-12 border-l-4 flex items-center px-4 py-3 hover:text-primary hover:border-secondary font-semibold"
            >
              {city}
            </p>
          ))}
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
        <Button className="bg-primary mx-auto self-end">
          Next <span>&#8594;</span>
        </Button>
      </div>
    </div>
  );
};

export default Location;
