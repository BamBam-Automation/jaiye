import React from "react";
import History from "../images/HistoryCard.svg";

const HistoryCard = () => {
  return (
    <div>
      <div className="relative">
        <img className="w-full" src={History} alt="" />
        <div className="absolute top-0 w-full px-7 pt-8">
          <div className="font-semibold flex items-center justify-between text-[#848484]">
            <p>Owner</p>
            <p>Number of Guest(s)</p>
          </div>
          <div className="relative text-[#fefafb] font-bold flex items-center justify-between">
            <h6>Emmanuel Adegbola</h6>
            <h6>3</h6>
          </div>
          <div className="flex justify-between mt-5">
            <div>
              <p className="text-[#848484]">Date</p>
              <h6 className="text-[#fefafb] font-semibold">July 02</h6>
            </div>
            <div>
              <p className="text-[#848484]">Time</p>
              <h6 className="text-[#fefafb] font-semibold">10:00PM</h6>
            </div>
            <div>
              <p className="text-[#848484]">Table Number</p>
              <h6 className="text-[#fefafb] font-semibold">Table 6</h6>
            </div>
          </div>
          <div className="absolute w-full left-0 px-7 -bottom-20">
            <div className="flex items-center justify-between bottom-0">
              <h6 className="text-[#848484] text-xl font-semibold">Jaiye</h6>
              <h6 className="text-[#fefafb] font-semibold text-xl">
                N1,000,000.00
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
