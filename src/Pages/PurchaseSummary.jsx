import React from "react";
import NavBar from "../components/NavBar";

const PurchaseSummary = () => {
  return (
    <div className="p-7 grid gap-5 items-start">
      <NavBar title={"Purchase Summary"} />
      {/* <p className="font-bold text-2xl">{summary?.description}</p> */}
    </div>
  );
};

export default PurchaseSummary;
