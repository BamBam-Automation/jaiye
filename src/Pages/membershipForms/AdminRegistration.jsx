import React, { useState } from "react";
import Input from "../../components/Input";
import { Alert, Spinner } from "@material-tailwind/react";
import PrimaryButton from "../../components/PrimaryButton";
import { CiWarning } from "react-icons/ci";
import axiosInstance from "../../utils/axios/axios";
import { BsPatchCheck } from "react-icons/bs";

const AdminRegistration = () => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confrimPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [icon, setIcon] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = () => {
    const data = {
      firstName,
      lastName,
      email,
      phone,
      password,
    };
    if (!firstName || !lastName || !email || !phone || !password) {
      setAlert(!alert);
      setBgColor("red");
      setIcon(<CiWarning />);
      setResponse("Required fields are empty");
      //   console.log(data);
    } else if (password !== confrimPassword) {
      setAlert(!alert);
      setBgColor("red");
      setIcon(<CiWarning />);
      setResponse("Passwords do not match");
    } else {
      setLoading(true);
      axiosInstance
        .post("/admin-registration", data)
        .then((res) => {
          setAlert(!alert);
          setBgColor("green");
          setIcon(<BsPatchCheck />);
          setLoading(false);
          setResponse(res.data.message);
        })
        .catch((err) => {
          setLoading(false);
          setAlert(!alert);
          setBgColor("red");
          setIcon(<CiWarning />);
          setResponse(
            err?.data?.message || err?.response?.data?.message || err?.message
          );
        });
    }
    // console.log(data);
  };

  setTimeout(() => {
    if (alert === true) {
      setAlert(false);
    }
  }, 3000);

  return (
    <form action="" className="grid gap-3 lg:w-2/3 lg:mx-auto">
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
        label={"First Name"}
        type={"text"}
        id={"firstName"}
        value={firstName}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      <Input
        label={"Last Name"}
        type={"text"}
        id={"lastName"}
        value={lastName}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />
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
        label={"Phone Number"}
        type={"text"}
        id={"phone"}
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
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
      <Input
        label={"Confirm Password"}
        type={"password"}
        id={"confrimPassword"}
        value={confrimPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <PrimaryButton
        onClick={handleSubmit}
        text={loading ? <Spinner color="pink" /> : "Login"}
      />
    </form>
  );
};

export default AdminRegistration;
