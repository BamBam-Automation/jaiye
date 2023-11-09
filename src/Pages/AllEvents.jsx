import NavBar from "../components/NavBar";
import PageTitle from "../utils/PageTitle";
import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";

const AllEvents = () => {
  PageTitle("Jaiye - Recently Booked Event");

  const location = useLocation();
  const summary = location?.state;
  const user = sessionStorage.getItem("username");

  return (
    <div className="p-7 grid gap-5 items-start">
      <NavBar title={"Booked Event Summary"} />
      <div className="mt-10 grid gap-5">
        <div className="bg-primary/10 p-5 rounded-lg shadow-2xl grid gap-3">
          <div>
            <p>Booked By:</p>
            <p className="text-primary font-bold text-2xl">{user}</p>
          </div>
          <div>
            <p className="text-primary font-semibold text-xl">Ticket Type</p>
            <p>{summary?.event}</p>
          </div>
          <div>
            <p className="text-primary font-semibold text-xl">
              Payment Transaction Reference
            </p>
            <p>{summary?.details}</p>
          </div>
          <div>
            <p className="text-primary font-semibold text-xl">Ticket Price</p>
            <p>{summary?.amount}</p>
          </div>

          <QRCode
            title="GeeksForGeeks"
            // value={value}
            // bgColor={back}
            // fgColor={fore}
          />
        </div>
        {/* {events.length === 0 ? (
          <p className="mx-auto text-center text-2xl font-semibold text-primary">
            You have no active reservations
          </p>
        ) : (
          events.map((event) => (
            <HistoryCard
              key={event.ticketId}
              owner={event.eventName}
              //   guests={event.numberOfGuest}
              date={event.eventStartDate}
              //   time={TimeConverter(event.timeOfEvent)}
              //   table={event.tableNumber}
              //   price={event.eventPrice}
            />
          ))
        )} */}
      </div>
    </div>
  );
};

export default AllEvents;
