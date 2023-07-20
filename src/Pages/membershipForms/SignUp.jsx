import React from "react";
import Input from "../../components/Input";
import { Checkbox } from "@material-tailwind/react";
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
      <Checkbox
        className="text-primary"
        label={
          <>
            I agree to the{" "}
            <Link className="text-primary underline underline-offset-4">
              Terms & Conditions
            </Link>{" "}
            <span>and</span>{" "}
            <Link className="text-primary underline underline-offset-4">
              Privacy Policy
            </Link>
          </>
        }
      />
    </>
  );
};

export default SignUp;
