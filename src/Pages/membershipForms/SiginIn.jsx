import React from "react";
import PrimaryButton from "../../components/PrimaryButton";
import Input from "../../components/Input";

const SiginIn = () => {
  return (
    <>
      <form className="grid mt-20 gap-4">
        <Input label={"Email"} type={"email"} id={"email"} />
        <Input label={"Password"} type={"password"} id={"password"} />
        <PrimaryButton text={"Login"} />
      </form>
    </>
  );
};

export default SiginIn;
