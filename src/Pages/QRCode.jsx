import React from "react";
import QRScannerComponent from "../components/QRScannerComponent";
import NavBar from "../components/NavBar";
import { BiSolidImageAlt } from "react-icons/bi";
import { IoMdFlashOff } from "react-icons/io";
import { SlRefresh } from "react-icons/sl";
import { useSelector } from "react-redux";

const QRCode = () => {
  const userLevel = useSelector((state) => state?.user?.user?.userType);
  console.log(userLevel);
  return (
    <div className="p-7 grid gap-5 min-h-screen items-start">
      <div className="grid gap-3 items-start">
        <NavBar title={"Scan QR Code"} />
      </div>
      <div className="flex justify-around">
        <BiSolidImageAlt className="w-10 h-10 p-2 rounded-full shadow-xl text-[#848484]" />
        <IoMdFlashOff className="w-10 h-10 p-2 rounded-full shadow-xl text-[#848484]" />
        <SlRefresh className="w-10 h-10 p-2 rounded-full shadow-xl text-[#848484]" />
      </div>
      <p className="text-center w-1/2 text-primary mx-auto">
        Align the QR code within the frame to scan.
      </p>
      <div>
        <QRScannerComponent />
      </div>
    </div>
  );
};

export default QRCode;
