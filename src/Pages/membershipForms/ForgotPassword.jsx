import { Alert, Spinner } from "@material-tailwind/react";
import React, { useState } from "react";
import Input from "../../components/Input";
import PrimaryButton from "../../components/PrimaryButton";
import axiosInstance from "../../utils/axios/axios";
import { BsPatchCheck } from "react-icons/bs";
import { CiWarning } from "react-icons/ci";
import { BiHide, BiShowAlt } from "react-icons/bi";

const ForgotPassword = () => {
  const [alert, setAlert] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [icon, setIcon] = useState("");
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    console.log(email);
    setLoading(true);
    axiosInstance
      .post(`forgotpassword?email=${email}&callbackUrl=/join`)
      .then((res) => {
        console.log(res);
        setAlert(!alert);
        setBgColor("green");
        setIcon(<BsPatchCheck />);
        setResponse("Request Successful! Check your mail");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setAlert(!alert);
        setBgColor("red");
        setIcon(<CiWarning />);
        setResponse("Request Failed. Try again!");
      });
  };

  return (
    <form className="grid gap-5">
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
      {mail && (
        <Input
          label={"Email Address"}
          type={"email"}
          id={"email"}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      )}
      {!mail && (
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
      )}
      <PrimaryButton
        onClick={handleSubmit}
        text={loading ? <Spinner color="pink" /> : "Login"}
      />
    </form>
  );
};

export default ForgotPassword;
