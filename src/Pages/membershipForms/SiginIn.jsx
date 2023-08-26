import React from "react";
import Input from "../../components/Input";
import { Link } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import axiosInstance from "../../utils/axios/axios";
import LoadingSkeleton from "react-loading-skeleton";
import { useState } from "react";

const SiginIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);

  const data = {
    email,
    password,
  };

  const handleSubmit = () => {
    console.log(data);
    axiosInstance
      .post("/registration", data)
      .then((res) => {
        setLoading(false);
        console.log(res);
      })
      .catch((err) => {
        setLoading(false);
        if (
          err.message === "timeout of 2000ms exceeded" ||
          "Request failed with status code 500"
        ) {
          setResponse("Request failed. please try again.");
        }
        console.log(err);
      });
  };
  return (
    <form action="" className="grid gap-5">
      <Input
        label={"Email"}
        type={"email"}
        id={"email"}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
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
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2" htmlFor="rememberMe">
          <input
            className="h-5 w-5 rounded-md border-primary text-primary focus:ring-primary"
            type="checkbox"
            name=""
            id=""
          />
          Remember Me
        </label>
        <Link className="text-primary">Forgot Password</Link>
      </div>
      <PrimaryButton
        onClick={handleSubmit}
        text={loading ? <LoadingSkeleton width={150} /> : "Login"}
      />
      {response}
    </form>
  );
};

export default SiginIn;
