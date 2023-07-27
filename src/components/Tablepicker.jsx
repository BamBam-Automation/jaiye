import React, { useState } from "react";
import { PiCheck } from "react-icons/pi";

const Tablepicker = () => {
  // Keep track of the selected table
  const [selectedTable, setSelectedTable] = useState(null);

  // Function to handle changes in the radio input
  const handleRadioChange = (e) => {
    setSelectedTable(e.target.value);
  };

  return (
    <ul className="px-3">
      <li className="flex justify-between">
        <input
          type="radio"
          id="table5"
          name="tables"
          value="Table 5"
          onChange={handleRadioChange}
          className="hidden peer"
          required
        />
        <label
          htmlFor="table5"
          className={`inline-flex items-center justify-between w-full py-2 cursor-pointer font-semibold ${
            selectedTable === "Table 5" ? "peer-checked:text-primary" : ""
          }`}
        >
          <div className="flex items-center w-full justify-between">
            <p>Table 5</p>
            {selectedTable === "Table 5" && <PiCheck />}
          </div>
        </label>
      </li>
      <li className="flex justify-between">
        <input
          type="radio"
          id="table6"
          name="tables"
          value="Table 6"
          onChange={handleRadioChange}
          className="hidden peer"
          required
        />
        <label
          htmlFor="table6"
          className={`inline-flex items-center justify-between w-full py-2 cursor-pointer font-semibold ${
            selectedTable === "Table 6" ? "peer-checked:text-primary" : ""
          }`}
        >
          <div className="flex items-center w-full justify-between">
            <p>Table 6</p>
            {selectedTable === "Table 6" && <PiCheck />}
          </div>
        </label>
      </li>
    </ul>
  );
};

export default Tablepicker;
