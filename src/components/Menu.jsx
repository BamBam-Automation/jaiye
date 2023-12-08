import React from "react";
import NavigationItem from "./NavigationItem";
import { FaCompass, FaUser } from "react-icons/fa";
import { IoIosHome, IoMdLogIn } from "react-icons/io";
import { GoHistory } from "react-icons/go";
import { FiPower } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../utils/app/userSlice";
import { useNavigate } from "react-router-dom";
import { MdOutlineQrCodeScanner } from "react-icons/md";

const Menu = (props) => {
  // Check if token exists
  const token = sessionStorage.getItem("token");
  const userLevel = useSelector((state) => state?.user?.user?.userType);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userLogOut = () => {
    dispatch(logout());
    navigate("/");
  };

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
      {token && userLevel === "AdminUser" ? (
        <NavigationItem link={"/scan"}>
          <MdOutlineQrCodeScanner className="h-6 w-6 p-[2px] lg:hidden" />
          <p>Scan</p>
        </NavigationItem>
      ) : (
        ""
      )}
      {token ? (
        <div
          className="p-4 hidden lg:block flex gap-3 items-center text-[#848484]"
          onClick={userLogOut}
        >
          <p>Logout</p>
          {/* <NavigationItem>
            <FiPower className="h-6 w-6 p-[2px] lg:hidden" />
          </NavigationItem> */}
        </div>
      ) : (
        ""
      )}
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
