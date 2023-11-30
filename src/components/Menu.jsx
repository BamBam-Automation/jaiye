import React from "react";
import NavigationItem from "./NavigationItem";
import { FaCompass, FaUser } from "react-icons/fa";
import { IoIosHome, IoMdLogIn } from "react-icons/io";
import { GoHistory } from "react-icons/go";
import { useState } from "react";
import { GrUserAdmin } from "react-icons/gr";
import PrimaryButton from "./PrimaryButton";
import Input from "./Input";

const Menu = (props) => {
  // Check if token exists
  const token = sessionStorage.getItem("token");

  // Manage Admin form State
  const [showAdminForm, setShowAdminForm] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Manage Admin login
  const handleAdminLogin = () => {
    console.log("first");
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
      <button
        className="flex items-center gap-5 px-5 text-[#848484]"
        onClick={() => setShowAdminForm(!showAdminForm)}
      >
        <GrUserAdmin className="h-6 w-6 p-[2px] text-[#848484] lg:hidden" />
        <p>Admin</p>
      </button>
      {showAdminForm && (
        <form
          className="grid gap-5 lg:absolute lg:top-[100%] lg:left-[40%] lg:bg-primary/20 lg:rounded-lg lg:p-5 lg:z-20"
          onSubmit={handleAdminLogin}
        >
          <Input
            label={"Username"}
            type={"text"}
            id={"username"}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Input
            label={"Password"}
            type={"password"}
            id={"password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <PrimaryButton text={"LOGIN"} />
        </form>
      )}
      {/* <NavigationItem link={"/scan"}>
              <MdCastConnected className="h-6 w-6 p-[2px]" />
              <p>Scan Ticket</p>
            </NavigationItem> */}
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
