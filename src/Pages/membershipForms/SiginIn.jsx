import React from "react";
import Input from "../../components/Input";
import { Checkbox } from "@material-tailwind/react";

const SiginIn = () => {
  return (
    <>
      <Input label={"Email"} type={"email"} id={"email"} />
      <Input label={"Password"} type={"password"} id={"password"} />
      <div className="flex items-center justify-between">
        <Checkbox className="bg-primary" label={"Remember Me"} />
        <p className="text-primary">Forgot Password</p>
      </div>
    </>
  );
};

export default SiginIn;
