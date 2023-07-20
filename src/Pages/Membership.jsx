import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import Group from "../images/Group.svg";
import SiginIn from "./membershipForms/SiginIn";

const Membership = () => {
  return (
    <div className="grid relative p-7">
      <div className="flex gap-6 items-center">
        <IoIosArrowBack className="h-5 w-5 text-primary" />
        <p className="font-medium">Login</p>
      </div>
      <img className="absolute right-0 top-0" src={Group} alt="Eclipse" />
      <h3 className="mt-9 text-primary font-bold text-3xl">
        Welcome <br />
        Back!
      </h3>
      <SiginIn />
    </div>
  );
};

export default Membership;
