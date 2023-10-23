import React from "react";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import axiosInstance from "../../utils/axios/axios";
import LoadingSkeleton from "react-loading-skeleton";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../utils/app/userSlice";
import { useEffect } from "react";

const SiginIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedPass = localStorage.getItem("pass");

    if (storedUser && storedPass) {
      setUsername(storedUser);
      setPassword(storedPass);
    }
  }, []);

  const handleSubmit = () => {
    const data = {
      username,
      password,
    };
    if (username && password !== "" && rememberMe) {
      localStorage.setItem("user", username);
      localStorage.setItem("pass", password);
      axiosInstance
        .post("/login", data)
        .then((res) => {
          setLoading(false);
          console.log(res);
          setResponse(res.data.message + ". Redirecting!");
          dispatch(login(res.data));
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response.data.errors);
          setLoading(false);
          setResponse(err.response.data.errors || err.message);
        });
    } else if (password === "" && username !== "") {
      setResponse("The password field is required");
    } else if (username === "" && password !== "") {
      setResponse("The username field is required");
    } else {
      axiosInstance
        .post("/login", data)
        .then((res) => {
          setLoading(false);
          console.log(res);
          setResponse(res.data.message + ". Redirecting!");
          dispatch(login(res.data));
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response.data.errors);
          setLoading(false);
          setResponse(err.response.data.errors || err.message);
        });
    }
  };
  return (
    <form action="" className="grid gap-5">
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
            value={rememberMe}
            onChange={() => {
              setRememberMe(!rememberMe);
              console.log(rememberMe);
            }}
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
