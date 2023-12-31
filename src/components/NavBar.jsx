import { Drawer, IconButton } from "@material-tailwind/react";
import React, { useState } from "react";
import { FiMenu, FiPower } from "react-icons/fi";
import Jaiye from "../images/Jaiye.svg";
// import Profile from "../images/Profile.svg";
import { IoIosArrowBack, IoIosHome, IoMdLogIn } from "react-icons/io";
import NavigationItem from "./NavigationItem";
import { FaCompass, FaUser } from "react-icons/fa";
import { MdCastConnected } from "react-icons/md";
import { GoHistory } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../utils/app/userSlice";
// import { CiBookmarkCheck } from "react-icons/ci";

const NavBar = (props) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // const location = useLocation();
  // console.log(location.pathname(-1));

  const previousPage = (e) => {
    navigate(-1);
  };

  const dispatch = useDispatch();
  const userLogOut = () => {
    dispatch(logout());
    navigate("/");
  };

  // Check if token exists
  const token = sessionStorage.getItem("token");

  // Get Current Username
  let username = sessionStorage.getItem("username");

  return (
    <div className="self-start flex font-semibold items-center justify-between">
      <div className="flex gap-5 items-center">
        <IoIosArrowBack
          className="h-5 w-5 text-primary"
          onClick={previousPage}
        />
        <h6>{props.title}</h6>
      </div>
      <FiMenu
        className="h-5 w-5 text-primary"
        onClick={() => {
          setOpen(true);
        }}
      />
      {open && (
        <Drawer
          className="p-10 grid items-start gap-10 rounded-l-xl"
          open={true}
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
          {token ? (
            <div className="flex items-center gap-3">
              {/* <img
                className="h-10 w-10 rounded-full object-contain"
                src={Profile}
                alt="profile"
              /> */}
              <h4 className="font-bold text-xl text-primary">{username}</h4>
            </div>
          ) : (
            ""
          )}
          <div className="grid gap-4">
            <NavigationItem link={"/"}>
              <FaCompass className="h-6 w-6 p-[2px]" />
              <p>Explore</p>
            </NavigationItem>
            {token ? (
              <NavigationItem link={"/dashboard"}>
                <IoIosHome className="h-6 w-6 p-[2px]" />
                <p>Dashboard</p>
              </NavigationItem>
            ) : (
              <NavigationItem link={"/join"}>
                <IoMdLogIn className="h-6 w-6 p-[2px]" />
                <p>Membership</p>
              </NavigationItem>
            )}
            {/* <NavigationItem link={"/scan"}>
              <MdCastConnected className="h-6 w-6 p-[2px]" />
              <p>Scan Ticket</p>
            </NavigationItem> */}
            <NavigationItem link={"/history"}>
              <GoHistory className="h-6 w-6 p-[2px]" />
              <p>History</p>
            </NavigationItem>
            <NavigationItem link={"/profile"}>
              <FaUser className="h-6 w-6 p-[2px]" />
              <p>Profile</p>
            </NavigationItem>
          </div>
          {token ? (
            <div onClick={userLogOut}>
              <button className="text-[#848484] flex items-center self-end gap-3">
                <FiPower className="h-8 w-8 p-[2px]" />
                <p>Sign Out</p>
              </button>
            </div>
          ) : (
            ""
          )}
        </Drawer>
      )}
    </div>
  );
};

export default NavBar;
