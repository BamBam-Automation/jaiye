import React, { useState } from "react";
import NavBar from "../components/NavBar";
import ProfileImg from "../images/Profile.svg";
import { Avatar } from "@material-tailwind/react";
import { BiEditAlt } from "react-icons/bi";
import { IoIosArrowForward, IoMdKey } from "react-icons/io";
import Input from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";

const Profile = () => {
  // Get Current Username
  let user = sessionStorage.getItem("username");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [username, setUsername] = useState(user ? user : "");

  return (
    <div className="p-7 grid gap-5 items-start">
      <NavBar title={"Profile"} />
      <div className="mx-auto grid justify-items-center relative gap-5">
        <h5 className="text-2xl font-medium">Profile</h5>
        <Avatar src={ProfileImg} size="xxl" />
        <BiEditAlt className="text-xl w-10 h-10 p-2 rounded-full bg-[#f8f8f8] shadow-xl absolute bottom-[25%] right-[30%]" />
        <h5 className="text-2xl font-semibold">{username}</h5>
      </div>
      <div className="space-y-5">
        <h4 className="font-semibold text-lg text-center">Account</h4>
        <div className="space-y-5 grid">
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
            label={"Old Password"}
            type={"password"}
            id={"oldPassword"}
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
          />
          <Input
            label={"New Password"}
            type={"password"}
            id={"newPassword"}
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <PrimaryButton
            onClick={() =>
              console.log(
                `Old Password: ${oldPassword}; New Password: ${newPassword}`
              )
            }
            text={"Change Password"}
          />
        </div>
        <div className="bg-gradient-to-b rounded-lg relative from-[#EB7C4C] to-[#A03484] p-0.5">
          <div className="h-10 p-[0.3px] bg-[#f9f9f9] rounded-lg flex items-center justify-between px-5">
            <div className="flex gap-5 items-center">
              <IoMdKey className="h-6 w-6 p-[2px] text-primary" />
              <p>Change Account Password</p>
            </div>
            <IoIosArrowForward className="h-5 w-5 text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
