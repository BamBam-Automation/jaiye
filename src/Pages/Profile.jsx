import React, { useState } from "react";
import NavBar from "../components/NavBar";
// import ProfileImg from "../images/Profile.svg";
import { Alert } from "@material-tailwind/react";
// import { BiEditAlt } from "react-icons/bi";
// import { IoIosArrowForward, IoMdKey } from "react-icons/io";
import Input from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";
import { CiWarning } from "react-icons/ci";
import axiosInstance from "../utils/axios/axios";
import { BsPatchCheck } from "react-icons/bs";
import PageTitle from "../utils/PageTitle";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../utils/app/userSlice";

const Profile = () => {
  // Get Current Username
  let user = sessionStorage.getItem("username");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState(user ? user : "");

  const [alert, setAlert] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [icon, setIcon] = useState("");
  const [response, setResponse] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const data = {
      username: username,
      currentPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };

    if (
      username === "" ||
      newPassword === "" ||
      confirmPassword === "" ||
      oldPassword === ""
    ) {
      setAlert(!alert);
      setBgColor("red");
      setIcon(<CiWarning />);
      setResponse("Please, check and try again");
    } else if (newPassword !== confirmPassword) {
      setAlert(!alert);
      setBgColor("red");
      setIcon(<CiWarning />);
      setResponse("New Passwords do not match");
    }

    axiosInstance
      .post("/changepassword", data)
      .then((res) => {
        // console.log(res);
        setAlert(!alert);
        setBgColor("green");
        setIcon(<BsPatchCheck />);
        setResponse(res.data.message);
        setNewPassword("");
        setConfirmPassword("");
        setOldPassword("");
        dispatch(logout());
        navigate("/");
      })
      .catch((err) => {
        // console.log(err);
        setAlert(!alert);
        setBgColor("red");
        setIcon(<CiWarning />);
        setResponse(err?.data?.message || "Request failed, try again");
      });
  };

  setTimeout(() => {
    if (alert === true) {
      setAlert(false);
    }
  }, 3000);

  PageTitle("Jaiye - Change Password");

  return (
    <div className="p-7 grid gap-5 items-start">
      <NavBar title={"Profile"} />
      <div className="mx-auto grid justify-items-center relative gap-5">
        <h5 className="text-2xl font-medium">Profile</h5>
        {/* <Avatar src={ProfileImg} size="xxl" />
        <BiEditAlt className="text-xl w-10 h-10 p-2 rounded-full bg-[#f8f8f8] shadow-xl absolute bottom-[25%] right-[30%]" /> */}
        <h5 className="text-2xl font-semibold">{username}</h5>
      </div>
      <div className="space-y-5">
        <h4 className="font-semibold text-lg text-center">Account</h4>
        <div className="grid gap-5 md:gap-10 w-full md:w-2/3 mx-auto lg:w-1/2">
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
          <Input
            label={"Confirm New Password"}
            type={"password"}
            id={"confirmPassword"}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <PrimaryButton onClick={handleSubmit} text={"Edit Profile"} />
        </div>
        {/* <div className="bg-gradient-to-b rounded-lg relative from-[#EB7C4C] to-[#A03484] p-0.5">
          <div className="h-10 p-[0.3px] bg-[#f9f9f9] rounded-lg flex items-center justify-between px-5">
            <div className="flex gap-5 items-center">
              <IoMdKey className="h-6 w-6 p-[2px] text-primary" />
              <p>Change Account Password</p>
            </div>
            <IoIosArrowForward className="h-5 w-5 text-primary" />
          </div>
        </div> */}
      </div>
      {alert && (
        <Alert
          animate={{
            mount: { y: 0 },
            unmount: { y: 0 },
          }}
          color={bgColor}
          icon={icon}
          className="absolute w-11/12 right-5 h-12 top-8 z-50"
        >
          {response}
        </Alert>
      )}
    </div>
  );
};

export default Profile;
