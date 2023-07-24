import React from "react";
import Input from "../../components/Input";
import { Link } from "react-router-dom";

const SiginIn = () => {
  return (
    <>
      <Input label={"Email"} type={"email"} id={"email"} />
      <Input label={"Password"} type={"password"} id={"password"} />
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
    </>
  );
};

export default SiginIn;
