import React from "react";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import axiosInstance from "../../utils/axios/axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../utils/app/userSlice";
import { useEffect } from "react";
import { BsPatchCheck } from "react-icons/bs";
import { CiWarning } from "react-icons/ci";
import { Alert, Spinner } from "@material-tailwind/react";

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

  const [alert, setAlert] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [icon, setIcon] = useState("");

  setTimeout(() => {
    if (alert === true) {
      setAlert(false);
    }
  }, 3000);

  const handleSubmit = () => {
    const data = {
      username,
      password,
    };

    const previousPage = sessionStorage.getItem("previousPage");
    if (username && password !== "" && rememberMe) {
      setLoading(true);
      localStorage.setItem("user", username);
      localStorage.setItem("pass", password);
      axiosInstance
        .post("/login", data)
        .then((res) => {
          setAlert(!alert);
          setBgColor("green");
          setIcon(<BsPatchCheck />);
          setLoading(false);
          setResponse(res.data.message + ". Redirecting!");
          dispatch(login(res.data));
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        })
        .catch((err) => {
          setLoading(false);
          setAlert(!alert);
          setBgColor("red");
          setIcon(<CiWarning />);
          setResponse(err.response.data.errors || err.message);
        });
    } else if (password === "" && username !== "") {
      setAlert(!alert);
      setBgColor("red");
      setIcon(<CiWarning />);
      setResponse("The password field is required");
    } else if (username === "" && password !== "") {
      setAlert(!alert);
      setBgColor("red");
      setIcon(<CiWarning />);
      setResponse("The username field is required");
    } else if (username === "" && password === "") {
      setAlert(!alert);
      setBgColor("red");
      setIcon(<CiWarning />);
      setResponse("Username and Password are required");
    } else {
      setLoading(true);
      axiosInstance
        .post("/login", data)
        .then((res) => {
          setAlert(!alert);
          setBgColor("green");
          setIcon(<BsPatchCheck />);
          setLoading(false);
          setResponse(res.data.message + ". Redirecting!");
          dispatch(login(res.data));
          setTimeout(() => {
            if (previousPage) {
              window.location.href = previousPage;
            } else {
              navigate("/");
            }
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          if (err.message === "timeout of 10000ms exceeded") {
            setAlert(!alert);
            setBgColor("red");
            setIcon(<CiWarning />);
            setResponse("Request timeout. Try again");
          } else {
            setAlert(!alert);
            setBgColor("red");
            setIcon(<CiWarning />);
            setResponse(err?.response?.data?.errors || err?.message);
          }
        });
    }
  };
  return (
    <form action="" className="grid gap-5">
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
        text={loading ? <Spinner color="pink" /> : "Login"}
      />
    </form>
  );
};

export default SiginIn;
