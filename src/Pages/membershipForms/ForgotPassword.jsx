import { Alert, Spinner } from "@material-tailwind/react";
import React, { useState } from "react";
import Input from "../../components/Input";
import PrimaryButton from "../../components/PrimaryButton";
import axiosInstance from "../../utils/axios/axios";
import { BsPatchCheck } from "react-icons/bs";
import { CiWarning } from "react-icons/ci";
import { BiHide, BiShowAlt } from "react-icons/bi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = ({ userToken }) => {
  const [alert, setAlert] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [icon, setIcon] = useState("");
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mail, setMail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const urlLink = window.location.href;
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (userToken) {
      setEmail(localStorage.getItem("userEmail"));
      setToken(userToken);
      setMail(true);
    }
  }, [userToken]);

  const handleSubmit = () => {
    let url = "";
    let data = {};
    if (userToken) {
      url = "resetpassword";
      data = {
        email: email,
        password: password,
        token: token,
      };
    } else {
      url = "forgotpassword";
      data = {
        email: email,
        callbackUrl: `${urlLink}?`,
      };
    }

    // console.log(data, url);
    if (userToken) {
      if (password !== confirmPassword) {
        setAlert(!alert);
        setBgColor("red");
        setIcon(<CiWarning />);
        setLoading(false);
        setResponse("Password and Confrim Password do not match");
      } else if (
        password !== "" &&
        confirmPassword !== "" &&
        password === confirmPassword
      ) {
        setLoading(true);
        axiosInstance
          .post(url, data)
          .then((res) => {
            setAlert(!alert);
            setBgColor("green");
            setIcon(<BsPatchCheck />);
            setResponse("Password changed successfully.");
            localStorage.clear();
            setLoading(false);
            setTimeout(() => {
              navigate("/join");
            }, 2000);
          })
          .catch((err) => {
            setAlert(!alert);
            setBgColor("red");
            setIcon(<CiWarning />);
            setLoading(false);
            setResponse("Request Failed. Try again!");
          });
      } else {
        setAlert(!alert);
        setBgColor("red");
        setIcon(<CiWarning />);
        setLoading(false);
        setResponse("Request fields empty. Try again!");
      }
    } else {
      if (email !== "") {
        localStorage.setItem("userEmail", email);
        setLoading(true);
        axiosInstance
          .post(url, data)
          .then((res) => {
            setAlert(!alert);
            setBgColor("green");
            setIcon(<BsPatchCheck />);
            setResponse("Request Successful! Check your mail");
            setLoading(false);
          })
          .catch((err) => {
            setAlert(!alert);
            setBgColor("red");
            setIcon(<CiWarning />);
            setLoading(false);
            setResponse("Request Failed. Try again!");
          });
      } else if (email === "") {
        setAlert(!alert);
        setBgColor("red");
        setIcon(<CiWarning />);
        setLoading(false);
        setResponse("Enter you email address");
      }
    }
  };

  setTimeout(() => {
    if (alert === true) {
      setAlert(false);
    }
  }, 3000);

  return (
    <form
      className="grid gap-5 lg:gap-10 lg:w-2/3 lg:mx-auto"
      onSubmit={handleSubmit}
    >
      {alert && (
        <Alert
          animate={{
            mount: { y: 0 },
            unmount: { y: 0 },
          }}
          color={bgColor}
          icon={icon}
          className="absolute h-auto top-8 w-11/12 right-5 z-50"
        >
          {response}
        </Alert>
      )}
      <Input
        label={"Email Address"}
        type={"email"}
        id={"email"}
        value={email}
        disabled={userToken ? true : false}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      {mail && (
        <div className="space-y-5">
          <div className="relative">
            <Input
              label={"Password"}
              type={showPassword ? "text" : "password"}
              id={"password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {!showPassword && (
              <BiShowAlt
                className="bg-[#F9F9F9] absolute text-primary/25 h-8 top-2 right-3 w-8"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
            {showPassword && (
              <BiHide
                className="bg-[#F9F9F9] absolute text-primary/25 h-8 top-2 right-3 w-8"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          <div className="relative">
            <Input
              label={"Confirm Password"}
              type={showConfirm ? "text" : "password"}
              id={"confirmPassword"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!showConfirm && (
              <BiShowAlt
                className="bg-[#F9F9F9] absolute text-primary/25 h-8 top-2 right-3 w-8"
                onClick={() => setShowConfirm(!showConfirm)}
              />
            )}
            {showConfirm && (
              <BiHide
                className="bg-[#F9F9F9] absolute text-primary/25 h-8 top-2 right-3 w-8"
                onClick={() => setShowConfirm(!showConfirm)}
              />
            )}
          </div>
        </div>
      )}
      <PrimaryButton
        onClick={handleSubmit}
        text={loading ? <Spinner color="pink" /> : "Reset Password"}
      />
    </form>
  );
};

export default ForgotPassword;
