import { Button } from "@material-tailwind/react";
import React from "react";
import NavBar from "./NavBar";
import Club from "../images/Club.jpg";
import { MdOutlineTableBar } from "react-icons/md";
import {
  BsTicketPerforated,
  BsBank2,
  BsCreditCard2Back,
  BsPaypal,
} from "react-icons/bs";
import { PiUsersLight } from "react-icons/pi";
import Paystack from "../images/Paystack.svg";

const TicketUI = () => {
  return (
    <div className="p-7 grid gap-5 h-screen items-start">
      <div className="grid gap-5 items-start">
        <NavBar title={"Ticket"} />
        <p className="text-center text-primary w-10/12 mx-auto">
          Once you buy a club ticket simply scan the QR-code to access to your
          Table.
        </p>
        <div className="flex items-center gap-3">
          <img
            className="basis-1/2 w-36 h-36 rounded-lg object-cover"
            src={Club}
            alt="bar"
          />
          <div className="space-y-2 basis-1/2">
            <h4 className="font-bold">Checkers Club</h4>
            <div className="flex gap-3 items-center">
              <MdOutlineTableBar className="text-primary h-5 w-5" />
              <h6 className="font-semibold">VIP Table</h6>
            </div>
            <div className="flex gap-3 items-center">
              <BsTicketPerforated className="text-primary -rotate-45 h-5 w-5" />
              <p>2,000,000 Naira</p>
            </div>
            <div className="flex gap-3 items-center">
              <PiUsersLight className="text-primary h-5 w-5" />
              <p>5 Guests</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h6 className="font-semibold">Date</h6>
            <p className="text-[#848484]">July 30</p>
          </div>
          <div>
            <h6 className="font-semibold">Time</h6>
            <p className="text-[#848484]">10:00 PM</p>
          </div>
          <div>
            <h6 className="font-semibold">Table Number</h6>
            <p className="text-[#848484]">Table 6</p>
          </div>
        </div>
        <div className="space-y-5">
          <h4 className="font-bold">Payment Method</h4>
          <label
            className="flex items-center cursor-pointer justify-between"
            htmlFor="bank"
          >
            <span className="flex items-center gap-5">
              <BsBank2 />
              <p>Bank Transfer</p>
            </span>
            <input
              className="checked:text-primary checked:outline-primary"
              type="radio"
              name="payment"
              id="bank"
            />
          </label>
          <label
            className="flex items-center cursor-pointer justify-between"
            htmlFor="card"
          >
            <span className="flex items-center gap-5">
              <BsCreditCard2Back />
              <p>Card Payment</p>
            </span>
            <input
              className="checked:text-primary checked:outline-primary"
              type="radio"
              name="payment"
              id="card"
            />
          </label>
          <label
            className="flex items-center cursor-pointer justify-between"
            htmlFor="paypal"
          >
            <span className="flex items-center gap-5">
              <BsPaypal />
              <p>Paypal</p>
            </span>
            <input
              className="checked:text-primary checked:outline-primary"
              type="radio"
              name="payment"
              id="paypal"
            />
          </label>
          <label
            className="flex items-center cursor-pointer justify-between"
            htmlFor="paystack"
          >
            <span className="flex items-center gap-5">
              <img src={Paystack} className="-ml-1" alt="paystack" />
              <p className="-ml-1">Paystack</p>
            </span>
            <input
              className="checked:text-primary checked:outline-primary"
              type="radio"
              name="payment"
              id="paystack"
            />
          </label>
        </div>
      </div>
      <Button className="self-end bg-primary">Book Table</Button>
    </div>
  );
};

export default TicketUI;
