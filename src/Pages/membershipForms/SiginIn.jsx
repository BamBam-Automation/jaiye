import React from "react";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import axiosInstance from "../../utils/axios/axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../utils/app/userSlice";
import { useEffect } from "react";
import { BsPatchCheck } from "react-icons/bs";
import { CiWarning } from "react-icons/ci";
import { Alert, Spinner } from "@material-tailwind/react";
import { BiHide, BiShowAlt } from "react-icons/bi";

const SiginIn = ({ setSignUpForm }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [email, setEmail] = useState("");
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

  const adminLogin = () => {
    setPassword("");
    setUsername("");
    setEmail("");
    setAdmin(!admin);
  };

  const handleSubmit = () => {
    // Handle user data depending on role
    let data = {};

    if (admin === false) {
      data = {
        username,
        password,
      };
    } else {
      data = {
        email,
        password,
      };
    }

    // Change URL depending on user role
    let URL = "";

    if (admin === false) {
      URL = "/login";
    } else {
      URL = "/admin-login";
    }

    const previousPage = sessionStorage.getItem("previousPage");
    // console.log(previousPage);

    // console.log(data);

    if (username && password !== "" && rememberMe) {
      setLoading(true);
      localStorage.setItem("user", username);
      localStorage.setItem("pass", password);
      axiosInstance
        .post(URL, data)
        .then((res) => {
          console.log(res);
          setAlert(!alert);
          setBgColor("green");
          setIcon(<BsPatchCheck />);
          setLoading(false);
          setResponse(res.data.message + ". Redirecting!");
          dispatch(login(res.data));
          setTimeout(() => {
            if (previousPage) {
              window.location.assign(previousPage);
            } else {
              navigate("/cocoFest");
            }
          }, 2000);
        })
        .catch((err) => {
          setLoading(false);
          setAlert(!alert);
          setBgColor("red");
          setIcon(<CiWarning />);
          setResponse(err.response.data.errors || err.message);
        });
    } else if (password === "") {
      setAlert(!alert);
      setBgColor("red");
      setIcon(<CiWarning />);
      setResponse("The password field is required");
    } else if ((username === "" || email === "") && password === "") {
      console.log(data);
      setAlert(!alert);
      setBgColor("red");
      setIcon(<CiWarning />);
      setResponse("Fields below are required");
    } else {
      setLoading(true);
      axiosInstance
        .post(URL, data)
        .then((res) => {
          console.log(res);
          // console.log(previousPage);
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
              navigate("/cocoFest");
            }
          }, 2000);
        })
        .catch((err) => {
          // console.log(err);
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
            setResponse(err?.response?.data?.Message || err?.message);
          }
        });
    }
  };

  // State to show password
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-5">
      <form
        onSubmit={handleSubmit}
        className="grid gap-5 lg:gap-7 lg:w-2/3 lg:mx-auto"
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
        {!admin ? (
          <Input
            label={"Username"}
            type={"text"}
            id={"username"}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        ) : (
          <Input
            label={"Email"}
            type={"email"}
            id={"email"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        )}
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
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2" htmlFor="rememberMe">
            <input
              className="h-5 w-5 rounded-md border-primary text-primary focus:ring-primary"
              type="checkbox"
              name=""
              value={rememberMe}
              onChange={() => {
                setRememberMe(!rememberMe);
              }}
              id=""
            />
            Remember Me
          </label>
          <button className="text-primary" onClick={() => setSignUpForm(2)}>
            Forgot Password
          </button>
        </div>
        <PrimaryButton
          onClick={handleSubmit}
          text={loading ? <Spinner color="pink" /> : "Login"}
        />
      </form>
      <p className="text-center text-lg">
        To sign in as {admin ? "user" : "admin"}, click{" "}
        <button
          className="text-primary"
          onClick={() => {
            // setAdmin(!admin);
            adminLogin();
          }}
        >
          Here
        </button>
      </p>
    </div>
  );
};

export default SiginIn;
