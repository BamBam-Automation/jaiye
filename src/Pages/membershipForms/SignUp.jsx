import React from "react";
import Input from "../../components/Input";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <>
      <Input label={"Email"} type={"email"} id={"email"} />
      <Input label={"Password"} type={"password"} id={"password"} />
      <Input
        label={"Confirm Password"}
        type={"password"}
        id={"confirmPassword"}
      />
      <label className="flex items-center gap-2" htmlFor="rememberMe">
        <input
          className="h-5 w-5 rounded-md border-primary text-primary focus:ring-primary"
          type="checkbox"
          name=""
          id=""
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
    </>
  );
};

export default SignUp;
