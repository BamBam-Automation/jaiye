import React from "react";
import History from "../images/HistoryCard.svg";
// import { useState } from "react";
// import { useEffect } from "react";

const HistoryCard = (props) => {
  return (
    <div onClick={props.onClick}>
      <div className="relative h-full">
        <img className="w-full" src={History} alt="" />
        <div className="absolute top-0 w-full px-7 pt-8">
          <div className="font-semibold flex items-center justify-between text-[#848484]">
            <p>Owner</p>
            <p>Venue</p>
          </div>
          <div className="relative text-[#fefafb] font-bold flex items-center justify-between">
            <h6>{props.owner}</h6>
            <h6 className="text-right">{props.guests}</h6>
          </div>
          <div className="flex justify-between mt-5">
            <div>
              <p className="text-[#848484]">Date</p>
              <h6 className="text-[#fefafb] font-semibold">{props.date}</h6>
            </div>
            <div>
              <p className="text-[#848484]">Start Time</p>
              <h6 className="text-[#fefafb] font-semibold">{props.time}</h6>
            </div>
            <div>
              <p className="text-[#848484]">Table Number</p>
              <h6 className="text-[#fefafb] font-semibold">{props.table}</h6>
            </div>
          </div>
          <div className="absolute w-full left-0 px-7 -bottom-16">
            <div className="flex items-center justify-between bottom-0">
              <h6 className="text-[#848484] text-xl font-semibold">Jaiye</h6>
              {/* <h6 className="text-[#fefafb] font-semibold text-xl">
                {`N ${props.price}`}
              </h6> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
