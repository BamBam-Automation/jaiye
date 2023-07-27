import React, { useState } from "react";

const TimePicker = (props) => {
  const [selectedTime, setSelectedTime] = useState("");

  // Function to generate an array of time options with 30 minutes interval
  const generateTimeOptions = () => {
    const timeOptions = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        const time = `${formattedHour}:${formattedMinute}`;
        timeOptions.push(time);
      }
    }
    return timeOptions;
  };

  const timeOptions = generateTimeOptions();

  const handleSelectedTime = (time) => {
    console.log(time);
    setSelectedTime(time);
  };

  return (
    <div className="flex flex-wrap gap-2 mx-auto">
      {timeOptions.map((time, index) => (
        <button
          key={index}
          className={`px-4 py-2 rounded ${
            selectedTime === time
              ? "bg-primary text-white"
              : "bg-white text-black"
          }`}
          onClick={() => handleSelectedTime(time)}
        >
          {time}
        </button>
      ))}
    </div>
  );
};

export default TimePicker;
