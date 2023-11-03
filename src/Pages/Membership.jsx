import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Group from "../images/Group.svg";
import SignIn from "./membershipForms/SiginIn";
import { FcGoogle } from "react-icons/fc";
// import { BiLogoApple } from "react-icons/bi";
import SignUp from "./membershipForms/SignUp";
import PageTitle from "../utils/PageTitle";
import { useNavigate } from "react-router-dom";
// import axiosInstance from "../utils/axios/axios";
import { Button } from "@material-tailwind/react";

const Membership = () => {
  // State for Visible Form
  const [signUpForm, setSignUpForm] = useState(false);

  // Handle Visible Page Title
  const title = () => {
    if (!signUpForm) {
      return "Jaiye - Sign In";
    } else {
      return "Jaiye - Sign Up";
    }
  };

  // Page Title Handler
  PageTitle(title());

  const navigate = useNavigate();

  // const responseGoogle = (response) => {
  //   console.log(response); // Handle the Google Sign-In response here
  // };

  // const handleSuccess = (response) => {
  //   console.log("Google Sign-In successful:", response);
  //   // You can handle the Google Sign-In response here
  // };

  // const handleError = (error) => {
  //   console.error("Google Sign-In error:", error);
  //   // Handle errors here
  // };

  // const [accessToken, setAccessToken] = useState("");

  // useEffect(() => {
  //   const data = {
  //     accessToken: accessToken,
  //   };
  //   axiosInstance
  //     .post("/google-auth", data)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [accessToken]);

  // function handleCallbackResponse(response) {
  //   console.log(response.credential);
  // }

  // useEffect(() => {
  //   // /*** Google Script ***/
  //   google.accounts.id.initialize({
  //     client_id:
  //       "748855953781-sg66g9o7cq4j04i3bjk0d7r3lsndm1v2.apps.googleusercontent.com",
  //     callback: handleCallbackResponse,
  //   });
  // }, []);

  // const handleGoogleLogin = () => {
  //   // Trigger the Google Identity Services login
  //   google.accounts.id.prompt();
  // };

  return (
    <div className="grid relative p-7 content-between h-screen">
      <div className="flex gap-6 items-center">
        <IoIosArrowBack
          className="h-5 w-5 text-primary"
          onClick={() => navigate(-1)}
        />
        <p className="font-medium">{!signUpForm ? "Login" : "Sign Up"}</p>
      </div>
      <img className="absolute right-0 top-0" src={Group} alt="Eclipse" />
      <h3 className="mt-9 text-primary font-bold text-3xl">
        {!signUpForm ? (
          <>
            Welcome
            <br />
            Back!
          </>
        ) : (
          <>
            Create
            <br />
            Account
          </>
        )}
      </h3>
      <>
        {!signUpForm && <SignIn />}
        {signUpForm && <SignUp />}
      </>
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
        {/* <Button
          size="lg"
          variant="outlined"
          color="blue-gray"
          className="flex items-center justify-center gap-3 border border-[#8C8A93]"
        >
          <BiLogoApple className="text-2xl" />
          Sign-up with Apple
        </Button> */}
        <p className="text-center text-lg">
          Don't have an account?{" "}
          <span
            className="text-primary cursor-pointer"
            onClick={() => {
              setSignUpForm(!signUpForm);
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
