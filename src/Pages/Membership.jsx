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
import { useDispatch } from "react-redux";
import { CiWarning } from "react-icons/ci";
import { BsPatchCheck } from "react-icons/bs";
import { loginSuccess } from "../utils/app/userSlice";
import BigCirlces from "../images/BigCircles.svg";
import Jaiye from "../images/Jaiye.svg";
import AdminRegistration from "./membershipForms/AdminRegistration";

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
    } else if (signUpForm === 2) {
      return "Jaiye - Admin Registration";
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
      setAccessToken(tokenResponse.access_token);
    },
  });

  const previousPage = sessionStorage.getItem("previousPage");

  useEffect(() => {
    const handleGoogleLogin = async () => {
      if (accessToken) {
        const data = {
          accessToken: accessToken,
        };

        try {
          const res = await axiosInstance.post("/google-auth", data);

          // Dispatch the action with user data
          dispatch(loginSuccess(res.data));
          // dispatch(loginSuccess(res.data));

          setAlert(!alert);
          setBgColor("green");
          setIcon(<BsPatchCheck />);
          setResponse(res.data.message + ". Redirecting!");

          setTimeout(() => {
            if (previousPage) {
              window.location.href = previousPage;
            } else {
              navigate("/cocoFest");
            }
          }, 2000);
        } catch (err) {
          console.error(err);
          setAlert(!alert);
          setBgColor("red");
          setIcon(<CiWarning />);
          setResponse(err?.response?.data?.Message || err?.message);
        }
      }
    };

    handleGoogleLogin();
  }, [accessToken]);

  const pageHeader = () => {
    if (signUpForm === 0) {
      return "Login";
    } else if (signUpForm === 1) {
      return "Sign Up";
    } else if (signUpForm === 2) {
      return "Admin Sign Up";
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
      return <>Welcome Back!</>;
    } else if (signUpForm === 1) {
      return <>Create Account</>;
    } else {
      return <>Forgot Password</>;
    }
  };

  return (
    <div className="w-screen lg:flex lg:flex-row-reverse">
      <img className="absolute right-0 top-0" src={Group} alt="Eclipse" />
      <div className="hidden lg:block h-screen relative bg-gradient-to-br from-[#EB7C4C] to-[#A03484] basis-1/2">
        <img
          src={BigCirlces}
          alt="bg-image"
          className="absolute bottom-0 mix-blend-multiply left-0 h-screen w-full"
        />
      </div>
      <div className="grid p-7 content-between h-screen lg:basis-1/2 lg:content-center">
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
        <div className="block md:hidden">
          <div className="flex gap-6 items-center">
            <IoIosArrowBack
              className="h-5 w-5 text-primary"
              onClick={() => navigate(-1)}
            />
            <p className="font-medium">{pageHeader()}</p>
          </div>
        </div>
        <div className="hidden lg:block mx-auto">
          <div className="grid gap-5">
            <img src={Jaiye} alt="jaiye-logo" className="mx-auto" />
            <h1 className="text-center text-6xl font-extrabold">Jaiye</h1>
          </div>
        </div>
        <h3 className="mt-5 text-primary font-bold text-3xl md:text-center lg:mb-5 z-20">
          {pageTitles()}
        </h3>
        <>{visibleForm()}</>
        <div className="flex items-center gap-2 my-5 lg:w-2/3 lg:mx-auto">
          <span className="h-[1px] bg-secondary w-full"></span>
          <p>or</p>
          <span className="h-[1px] bg-secondary w-full"></span>
        </div>
        <div className="grid gap-5 lg:w-2/3 lg:mx-auto">
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
          {/* {!signUpForm ? (
            <p className="text-center text-lg">
              To sign in as admin, click{" "}
              <button className="text-primary" onClick={() => setSignUpForm(2)}>
                Here
              </button>
            </p>
          ) : (
            ""
          )} */}
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
    </div>
  );
};

export default Membership;
