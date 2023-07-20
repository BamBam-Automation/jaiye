import React from "react";
import Input from "../../components/Input";
import { Checkbox } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const SiginIn = () => {
  return (
    <>
      <Input label={"Email"} type={"email"} id={"email"} />
      <Input label={"Password"} type={"password"} id={"password"} />
      <div className="flex items-center justify-between">
        <Checkbox className="text-primary" label={"Remember Me"} />
        <Link className="text-primary">Forgot Password</Link>
      </div>
    </>
  );
};

export default SiginIn;
