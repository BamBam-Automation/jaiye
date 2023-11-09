import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Group from "../images/Group.svg";
import SignIn from "./membershipForms/SiginIn";
import { FcGoogle } from "react-icons/fc";
import SignUp from "./membershipForms/SignUp";
import PageTitle from "../utils/PageTitle";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, Button } from "@material-tailwind/react";
import ForgotPassword from "./membershipForms/ForgotPassword";
import { useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axiosInstance from "../utils/axios/axios";
import { hasGrantedAnyScopeGoogle } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { CiWarning } from "react-icons/ci";
import { BsPatchCheck } from "react-icons/bs";

const Membership = () => {
  // State for Visible Form
  const [signUpForm, setSignUpForm] = useState(0);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let userToken = searchParams.toString();
  userToken = decodeURIComponent(userToken);

  useEffect(() => {
    if (userToken) {
      setSignUpForm(2);
    } else {
      setSignUpForm(0);
    }
  }, [userToken]);

  const navigate = useNavigate();

  // Handle Visible Page Title
  const title = () => {
    if (signUpForm === 0) {
      return "Jaiye - Sign In";
    } else if (signUpForm === 1) {
      return "Jaiye - Sign Up";
    } else {
      return "Jaiye - Forgot Password";
    }
  };

  // Page Title Handler
  PageTitle(title());

  const [accessToken, setAccessToken] = useState("");
  const [alert, setAlert] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [icon, setIcon] = useState("");
  const [response, setResponse] = useState("");

  setTimeout(() => {
    if (alert === true) {
      setAlert(false);
    }
  }, 3000);

  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      setAccessToken(tokenResponse.access_token);
      const data = {
        accessToken: accessToken,
      };
      axiosInstance
        .post("/google-auth", data)
        .then((res) => {
          console.log(res);
          setAlert(!alert);
          setBgColor("green");
          setIcon(<BsPatchCheck />);
          setResponse(res.data.message + ". Redirecting!");
          dispatch(login(res.data));
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((err) => {
          setAlert(!alert);
          setBgColor("red");
          setIcon(<CiWarning />);
          setResponse(err?.response?.data?.Message || err?.message);
        });
    },
  });

  const pageHeader = () => {
    if (signUpForm === 0) {
      return "Login";
    } else if (signUpForm === 1) {
      return "Sign Up";
    } else {
      return "Forgot Password";
    }
  };

  const visibleForm = () => {
    if (signUpForm === 0) {
      return <SignIn setSignUpForm={setSignUpForm} />;
    } else if (signUpForm === 1) {
      return <SignUp />;
    } else {
      return <ForgotPassword userToken={userToken} />;
    }
  };

  const pageTitles = () => {
    if (signUpForm === 0) {
      return (
        <>
          Welcome
          <br />
          Back!
        </>
      );
    } else if (signUpForm === 1) {
      return (
        <>
          Create
          <br />
          Account
        </>
      );
    } else {
      return (
        <>
          Forgot
          <br />
          Password
        </>
      );
    }
  };

  return (
    <div className="grid relative p-7 content-between h-screen">
      {alert && (
        <Alert
          animate={{
            mount: { y: 0 },
            unmount: { y: 0 },
          }}
          color={bgColor}
          icon={icon}
          className="absolute h-auto top-8 w-11/12 right-5 z-40"
        >
          {response}
        </Alert>
      )}
      <div className="flex gap-6 items-center">
        <IoIosArrowBack
          className="h-5 w-5 text-primary"
          onClick={() => navigate(-1)}
        />
        <p className="font-medium">{pageHeader()}</p>
      </div>
      <img className="absolute right-0 top-0" src={Group} alt="Eclipse" />
      <h3 className="mt-9 text-primary font-bold text-3xl">{pageTitles()}</h3>
      <>{visibleForm()}</>
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
          onClick={() => login()}
        >
          <FcGoogle className="text-2xl" />
          Sign-up with Google
        </Button>
        <p className="text-center text-lg">
          Don't have an account?{" "}
          <span
            className="text-primary cursor-pointer"
            onClick={() => {
              if (signUpForm === 0) {
                setSignUpForm(1);
              } else {
                setSignUpForm(0);
              }
            }}
          >
            {!signUpForm ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Membership;
