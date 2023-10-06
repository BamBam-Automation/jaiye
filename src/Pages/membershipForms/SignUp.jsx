import React, { useState } from "react";
import Input from "../../components/Input";
import { Link } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import axiosInstance from "../../utils/axios/axios";
import LoadingSkeleton from "react-loading-skeleton";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setIsEmailValid(emailPattern.test(email));
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail(email);
    e.target.blur();
  };

  const data = {
    username,
    email,
    password,
  };

  const handleSubmit = () => {
    // Check if the password meets the regex pattern
    if (/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/.test(password)) {
      // Password is valid, proceed with registration
      axiosInstance
        .post("/registration", data)
        .then((res) => {
          setLoading(false);
          setResponse(res.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          setLoading(false);
          if (
            err.message === "timeout of 10000ms exceeded" ||
            err.response.status === 500
          ) {
            setResponse(err.response.data.errors);
          } else {
            setResponse(err.data.message);
          }
        });
    } else {
      // Password is not valid
      setResponse("Password does not meet the criteria.");
    }
  };

  return (
    <form action="" className="grid gap-5">
      <Input
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
          // value={props.toggle}
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
        disabled={password !== confirmPassword}
        onClick={handleSubmit}
        text={loading ? <LoadingSkeleton width={150} /> : "Create Account"}
      />
      {!isEmailValid && (
        <p className="text-primary">Please enter a valid email address.</p>
      )}
      {password !== confirmPassword ? (
        <p className="text-primary">
          Password and Confirm Password do not match. Please try again.
        </p>
      ) : (
        ""
      )}
      {response}
    </form>
  );
};

export default SignUp;
