import React, { useState } from "react";
import { useEffect } from "react";
import { PiCheck } from "react-icons/pi";
import axiosInstance from "../utils/axios/axios";

const Tablepicker = ({ formData, setFormData }) => {
  // Function to handle changes in the radio input
  const handleRadioChange = (e) => {
    // setFormData({ ...formData, tableNumber: +e.table.name });
    setFormData({ ...formData, tableId: e.target.value });
    // setSelectedTable(e.target.value);
    console.log(formData.tableId);
  };

  const [tables, setTables] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/tables?pageIndex=1&pageSize=10")
      .then((res) => {
        console.log(res.data);
        setTables(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      {/* <li className="flex justify-between">
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
      </li> */}
    </ul>
  );
};

export default Tablepicker;
