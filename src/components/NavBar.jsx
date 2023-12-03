import { Drawer, IconButton } from "@material-tailwind/react";
import React, { useState } from "react";
import { FiMenu, FiPower } from "react-icons/fi";
import Jaiye from "../images/Jaiye.svg";
// import Profile from "../images/Profile.svg";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../utils/app/userSlice";
import Menu from "./Menu";
// import { CiBookmarkCheck } from "react-icons/ci";
import Avatar from "../images/Avatar.svg";

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
    <div className="lg:border-b sticky -top-10 bg-[#f9f9f9] z-40">
      <div className="hidden lg:block py-6 px-14">
        <div className="flex flex-grow justify-between">
          <span className="flex gap-4 items-center">
            <img src={Jaiye} alt="jaiye-logo" className="h-10" />
            <h1 className="text-3xl font-extrabold">Jaiye</h1>
          </span>
          <Menu />
          <div>
            <div className="h-12 w-12 rounded-full bg-[#FFEDEA] p-2">
              <img src={Avatar} alt="user-avatar" className="h-8" />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className="block lg:hidden">
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
              <Menu />
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
      </div>
    </div>
  );
};

export default NavBar;
