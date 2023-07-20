import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import Group from "../images/Group.svg";
import SiginIn from "./membershipForms/SiginIn";
import PrimaryButton from "../components/PrimaryButton";
import { FcGoogle } from "react-icons/fc";
import { BiLogoApple } from "react-icons/bi";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import SignUp from "./membershipForms/SignUp";

const Membership = () => {
  return (
    <div className="grid relative p-7 content-between h-screen">
      <div className="flex gap-6 items-center">
        <IoIosArrowBack className="h-5 w-5 text-primary" />
        <p className="font-medium">Login</p>
      </div>
      <img className="absolute right-0 top-0" src={Group} alt="Eclipse" />
      <h3 className="mt-9 text-primary font-bold text-3xl">
        Welcome <br />
        Back!
      </h3>
      <form action="" className="grid gap-5">
        <SignUp />
        <PrimaryButton text={"Login"} />
      </form>
      <div className="flex items-center gap-2">
        <span className="h-[1px] bg-secondary w-full"></span>
        <p>or</p>
        <span className="h-[1px] bg-secondary w-full"></span>
      </div>
      <div className="grid gap-5">
        <Button
          size="lg"
          variant="outlined"
          color="blue-gray"
          className="flex items-center justify-center gap-3 border border-[#8C8A93]"
        >
          <FcGoogle className="text-2xl" />
          Sign-up with Google
        </Button>
        <Button
          size="lg"
          variant="outlined"
          color="blue-gray"
          className="flex items-center justify-center gap-3 border border-[#8C8A93]"
        >
          <BiLogoApple className="text-2xl" />
          Sign-up with Apple
        </Button>
        <p className="text-center text-lg">
          Don't have an account? <Link className="text-primary">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Membership;
