import React from "react";
import NavBar from "../components/NavBar";
import HistoryCard from "../components/HistoryCard";

const History = () => {
  return (
    <div className="p-7 grid gap-5 items-start">
      <NavBar title={"History"} />
      <div className="mt-10 grid gap-5">
        <HistoryCard />
        <HistoryCard />
      </div>
    </div>
  );
};

export default History;
