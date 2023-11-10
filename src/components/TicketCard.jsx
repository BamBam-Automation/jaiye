import React from "react";
import QRCode from "react-qr-code";

const TicketCard = (props) => {
  const bgColor = "rgba(255, 255, 255, 0.0)";
  return (
    <div className="bg-primary/10 p-5 rounded-lg shadow-2xl grid gap-3">
      <div>
        <p>Booked By:</p>
        <p className="text-primary font-bold text-2xl">{props.user}</p>
      </div>
      <div>
        <p className="text-primary font-semibold text-xl">Ticket Type</p>
        <p>{props.event}</p>
      </div>
      <div>
        <p className="text-primary font-semibold text-xl">
          Payment Transaction Reference
        </p>
        <p>{props.details}</p>
      </div>
      <div>
        <p className="text-primary font-semibold text-xl">Ticket Price</p>
        <p>{props.amount}</p>
      </div>
      <div className="mx-auto bg-transparent shadow-md">
        <QRCode title={props.event} value={props.passKey} bgColor={bgColor} />
      </div>
    </div>
  );
};

export default TicketCard;
