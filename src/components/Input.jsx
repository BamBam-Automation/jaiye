import React from "react";

const Input = (props) => {
  return (
    <div className="bg-gradient-to-b rounded-lg relative from-[#EB7C4C] to-[#A03484] p-0.5">
      <input
        className="focus:outline-none peer bg-[#F9F9F9] w-full h-10 px-4 py-3 rounded"
        type={props.type}
        name=""
        id={props.id}
      />
      <label
        className="absolute top-2 left-5 text-lg peer-focus:text-base peer-focus:-top-3 peer-focus:px-1 peer-focus:bg-[#F9F9F9] transition-all"
        htmlFor={props.id}
      >
        {props.label}
      </label>
    </div>
  );
};

export default Input;
