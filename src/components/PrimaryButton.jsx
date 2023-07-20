import React from "react";

const PrimaryButton = (props) => {
  return (
    <button
      type="submit"
      class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary text-white hover:bg-primary/75 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 transition-all"
    >
      {props.text}
    </button>
  );
};

export default PrimaryButton;
