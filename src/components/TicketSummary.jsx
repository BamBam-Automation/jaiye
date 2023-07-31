import React from "react";
import NavBar from "./NavBar";
import { Carousel } from "@material-tailwind/react";

const TicketSummary = () => {
  return (
    <div className="grid gap-5 items-start">
      <NavBar title={"Card Payment"} />
      <Carousel
        className="rounded-xl"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        <img
          src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
          alt="1"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="2"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
          alt="3"
          className="h-full w-full object-cover"
        />
      </Carousel>
      <div className="border-y border-[#E5E5E5] py-3 space-y-5 mt-20">
        <div className="text-[#888888]">
          <div className="flex justify-between items-center">
            <p>Subtotal</p>
            <p>N2,000,000.00</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Tax</p>
            <p>N2.00</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <h4>Total</h4>
          <p>N2,000,002.00</p>
        </div>
      </div>
    </div>
  );
};

export default TicketSummary;
