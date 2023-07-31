import React from "react";
import { FiMenu } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";

const NavBar = (props) => {
  return (
    <div className="self-start flex font-semibold items-center justify-between">
      <div className="flex gap-5 items-center">
        <IoIosArrowBack className="h-5 w-5 text-primary" />
        <h6>{props.title}</h6>
      </div>
      <FiMenu className="h-5 w-5 text-primary" />
    </div>
  );
};

export default NavBar;
