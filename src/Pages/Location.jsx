import React from "react";
import Img from "../images/Location.svg";
import AllStates from "../utils/AllStates.json";
import { Option, Select } from "@material-tailwind/react";

const Location = () => {
  return (
    <div className="grid relative p-7 h-screen">
      <img className="absolute left-0 bottom-12" src={Img} alt="" />
      <div className="grid justify-items-center">
        <h3 className="text-5xl font-bold">Location</h3>
        <h6 className="font-medium text-[#afafaf]">Explore the Nights</h6>
      </div>
      <div className="bg-gradient-to-b h-11 rounded-lg relative from-[#EB7C4C] to-[#A03484] p-0.5">
        {/* <Select className="bg-[#f9f9f9] px-6" color="purple" label="State">
          {AllStates.map((state) => (
            <Option key={state} value={state}>
              {state}
            </Option>
          ))}
        </Select> */}
        <select
          className=" focus:outline-none placeholder-transparent peer bg-[#F9F9F9] w-full h-10 px-4 py-3 rounded"
          name="states"
          id="states"
        >
          <option className="block peer-focus:hidden" value="">
            State
          </option>
          {AllStates.map((state) => (
            <option className="w-2/3" key={state} value={state}>
              {state}
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
  );
};

export default Location;
