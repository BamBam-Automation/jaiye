import React, { useState } from "react";
import TicketUI from "../components/TicketUI";
import { Button } from "@material-tailwind/react";
import TicketSummary from "../components/TicketSummary";

const Ticket = () => {
  const [steps, setSteps] = useState(0);

  const activeStep = () => {
    if (steps === 0) {
      return <TicketUI />;
    } else if (steps === 1) {
      return <TicketSummary />;
    }
  };

  return (
    <div className="p-7 grid gap-5 h-screen items-start">
      <>{activeStep()}</>
      <Button
        className="self-end bg-primary"
        onClick={() => {
          setSteps(steps + 1);
        }}
      >
        {steps === 0 ? "Book Table" : "Pay Now"}
      </Button>
    </div>
  );
};

export default Ticket;
