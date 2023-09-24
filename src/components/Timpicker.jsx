import React, { useState } from "react";

const TimePicker = (props) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [step, setStep] = useState(0);

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (date) => {
    const currentDate = new Date();
    const selectedDateTime = new Date(date);

    if (selectedDateTime >= currentDate) {
      setSelectedDate(date);
      setStep(1); // Move to the time selection step
    }
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const formatDateTime = (date, time) => {
    if (!date && time) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return new Date(`${year}-${month}-${day}T${time}:00`).toISOString();
    }
    const formattedDate = new Date(`${date}T${time}:00`).toISOString();
    return formattedDate;
  };

  const formattedDateTime = formatDateTime(selectedDate, selectedTime);
  console.log(formattedDateTime); // Output will be in the format: 2023-09-24T11:56:26.825Z

  return (
    <div>
      {step === 0 && (
        <div className="my-4 px-1">
          {/* <label>Date:</label> */}
          <input
            className="text-primary border border-primary rounded-lg"
            type="date"
            value={selectedDate}
            min={getCurrentDate()}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </div>
      )}

      {step === 1 && (
        <div className="my-4">
          <label>Time:</label>
          <div className="flex flex-wrap gap-2 mx-auto">
            {generateTimeOptions().map((time, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded ${
                  selectedTime === time
                    ? "bg-primary text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => handleTimeChange(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="my-4">
        <p>Selected Date: {selectedDate}</p>
        {step === 1 && <p>Selected Time: {selectedTime}</p>}
      </div>
    </div>
  );
};

export default TimePicker;

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
