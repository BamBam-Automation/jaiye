import React from "react";
import { PiCheck } from "react-icons/pi";

const Tablepicker = ({ tables, formData, setFormData }) => {
  // Function to handle changes in the radio input
  const handleRadioChange = (e) => {
    // setFormData({ ...formData, tableNumber: +e.table.name });
    setFormData({ ...formData, tableId: e.target.value });
    // setSelectedTable(e.target.value);
    console.log(formData.tableId);
  };

  return (
    <ul className="px-3">
      {tables.map((table) => (
        <li className="flex justify-between" key={table.id}>
          <input
            type="radio"
            id={table.id}
            name="tables"
            value={table.id}
            onChange={handleRadioChange}
            className="hidden peer"
            required
          />
          <label
            htmlFor={table.id}
            className={`inline-flex items-center justify-between w-full py-2 cursor-pointer font-semibold ${
              formData.tableId === table.id ? "peer-checked:text-primary" : ""
            }`}
          >
            <div className="flex items-center w-full justify-between">
              <p>{table.name}</p>
              {formData.tableId === table.id && <PiCheck />}
            </div>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default Tablepicker;
