import NavBar from "../components/NavBar";
import PageTitle from "../utils/PageTitle";
import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";

const AllEvents = () => {
  PageTitle("Jaiye - Recently Booked Event");

  const location = useLocation();
  const { event, details, amount, ticketSummary } = location.state;
  const passKey = JSON.stringify(ticketSummary);
  const user = sessionStorage.getItem("username");

  const bgColor = "rgba(255, 255, 255, 0.0)";

  return (
    <div className="p-7 grid gap-5 items-start">
      <NavBar title={"Ticket Details"} />
      <div className="mt-10 grid gap-5">
        <div className="bg-primary/10 p-5 rounded-lg shadow-2xl grid gap-3">
          <div>
            <p>Booked By:</p>
            <p className="text-primary font-bold text-2xl">{user}</p>
          </div>
          <div>
            <p className="text-primary font-semibold text-xl">Ticket Type</p>
            <p>{event}</p>
          </div>
          <div>
            <p className="text-primary font-semibold text-xl">
              Payment Transaction Reference
            </p>
            <p>{details}</p>
          </div>
          <div>
            <p className="text-primary font-semibold text-xl">Ticket Price</p>
            <p>{amount}</p>
          </div>
          <div className="mx-auto bg-transparent shadow-md">
            <QRCode title={event} value={passKey} bgColor={bgColor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEvents;
