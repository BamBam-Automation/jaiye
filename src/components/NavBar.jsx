import { Drawer, IconButton } from "@material-tailwind/react";
import React, { useState } from "react";
import { FiMenu, FiPower } from "react-icons/fi";
import Jaiye from "../images/Jaiye.svg";
import Profile from "../images/Profile.svg";
import { IoIosArrowBack, IoIosHome } from "react-icons/io";
import NavigationItem from "./NavigationItem";
import { FaCompass, FaUser } from "react-icons/fa";
import { MdCastConnected } from "react-icons/md";
import { GoHistory } from "react-icons/go";

const NavBar = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="self-start flex font-semibold items-center justify-between">
      <div className="flex gap-5 items-center">
        <IoIosArrowBack className="h-5 w-5 text-primary" />
        <h6>{props.title}</h6>
      </div>
      <FiMenu className="h-5 w-5 text-primary" onClick={() => setOpen(true)} />
      <Drawer
        className="p-10 grid items-start gap-10 rounded-l-xl"
        open={open}
        placement="right"
        onClose={() => setOpen(false)}
      >
        <div className="flex items-center justify-between">
          <img className="h-10" src={Jaiye} alt="logo" />
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-10 rounded-full object-contain"
            src={Profile}
            alt="profile"
          />
          <h4 className="font-bold text-xl">Emmanuel Adegbola</h4>
        </div>
        <div className="grid gap-4">
          <NavigationItem>
            <IoIosHome className="h-6 w-6 p-[2px]" />
            <p>Home</p>
          </NavigationItem>
          <NavigationItem>
            <FaCompass className="h-6 w-6 p-[2px]" />
            <p>Explore</p>
          </NavigationItem>
          <NavigationItem>
            <MdCastConnected className="h-6 w-6 p-[2px]" />
            <p>Scan Ticket</p>
          </NavigationItem>
          <NavigationItem>
            <GoHistory className="h-6 w-6 p-[2px]" />
            <p>History</p>
          </NavigationItem>
          <NavigationItem>
            <FaUser className="h-6 w-6 p-[2px]" />
            <p>Profile</p>
          </NavigationItem>
        </div>
        <div>
          <div className="text-[#848484] flex items-center self-end gap-3">
            <FiPower className="h-8 w-8 p-[2px]" />
            <p>Sign Out</p>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default NavBar;
