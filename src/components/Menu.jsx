import React from "react";
import NavigationItem from "./NavigationItem";
import { FaCompass, FaUser } from "react-icons/fa";
import { IoIosHome, IoMdLogIn } from "react-icons/io";
import { GoHistory } from "react-icons/go";

const Menu = (props) => {
  // Check if token exists
  const token = sessionStorage.getItem("token");

  return (
    <div className="grid gap-4 lg:grid-flow-col relative">
      <NavigationItem link={"/"}>
        <FaCompass className="h-6 w-6 p-[2px] lg:hidden" />
        <p>Explore</p>
      </NavigationItem>
      {token ? (
        <NavigationItem link={"/dashboard"}>
          <IoIosHome className="h-6 w-6 p-[2px] lg:hidden" />
          <p>Dashboard</p>
        </NavigationItem>
      ) : (
        <NavigationItem link={"/join"}>
          <IoMdLogIn className="h-6 w-6 p-[2px] lg:hidden" />
          <p>Membership</p>
        </NavigationItem>
      )}
      <NavigationItem link={"/history"}>
        <GoHistory className="h-6 w-6 p-[2px] lg:hidden" />
        <p>History</p>
      </NavigationItem>
      {token ? (
        <NavigationItem link={"/profile"}>
          <FaUser className="h-6 w-6 p-[2px] lg:hidden" />
          <p>Profile</p>
        </NavigationItem>
      ) : (
        ""
      )}
    </div>
  );
};

export default Menu;
