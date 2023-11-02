import React, { useState } from "react";
import Input from "../../components/Input";
import { Link } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import axiosInstance from "../../utils/axios/axios";
import { BsPatchCheck } from "react-icons/bs";
import { Alert, Spinner } from "@material-tailwind/react";
import { CiWarning } from "react-icons/ci";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail));
  };

  const data = {
    username,
    email,
    password,
  };
  const [alert, setAlert] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [icon, setIcon] = useState("");

  setTimeout(() => {
    if (alert === true) {
      setAlert(false);
    }
  }, 3000);

  const handleSubmit = () => {
    setLoading(true);
    // Check if the password meets the regex pattern
    if (/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/.test(password)) {
      // Password is valid, proceed with registration
      axiosInstance
        .post("/registration", data)
        .then((res) => {
          setAlert(!alert);
          setBgColor("green");
          setIcon(<BsPatchCheck />);
          setLoading(false);
          setResponse(res.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setAlert(!alert);
          setBgColor("red");
          setIcon(<CiWarning />);
          setResponse(
            err?.data?.message || err?.response?.data?.message || err?.message
          );
        });
    } else {
      // Password is not valid
      setLoading(false);
      setAlert(!alert);
      setBgColor("red");
      setIcon(<CiWarning />);
      setResponse(
        "Password must be 8 characters long and must include, at least, one uppercase one special character"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      {alert && (
        <Alert
          animate={{
            mount: { y: 0 },
            unmount: { y: 0 },
          }}
          color={bgColor}
          icon={icon}
          className="absolute h-auto top-8 w-11/12 right-5"
        >
          {response}
        </Alert>
      )}
      <Input
        autoComplete={"off"}
        label={"Email"}
        type={"email"}
        id={"email"}
        value={email}
        onChange={handleEmailChange}
      />
      <Input
        label={"Username"}
        type={"text"}
        id={"username"}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        label={"Password"}
        type={"password"}
        id={"password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        label={"Confirm Password"}
        type={"password"}
        id={"confirmPassword"}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <label className="flex items-center gap-2" htmlFor="rememberMe">
        <input
          className="h-5 w-5 rounded-md border-primary text-primary focus:ring-primary"
          type="checkbox"
          name=""
          id=""
          value={agree}
          onChange={(e) => {
            setAgree((prevAgree) => !prevAgree);
          }}
        />
        <p>
          I agree to the{" "}
          <Link className="text-primary underline underline-offset-4">
            Terms & Conditions
          </Link>{" "}
          <span>and</span>{" "}
          <Link className="text-primary underline underline-offset-4">
            Privacy Policy
          </Link>
        </p>
      </label>
      <PrimaryButton
        disabled={
          password !== confirmPassword ||
          agree === false ||
          password === "" ||
          confirmPassword === "" ||
          // phone === "" ||
          email === ""
        }
        onClick={handleSubmit}
        text={loading ? <Spinner color="pink" /> : "Create Account"}
      />
      {!isEmailValid && (
        <p className="text-primary">Please enter a valid email address.</p>
      )}
      {password !== confirmPassword && (
        <p> Password and Confirm Password do not match. Please try again. </p>
      )}
    </form>
  );
};

export default SignUp;
