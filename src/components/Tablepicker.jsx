import React from "react";
import { PiCheck } from "react-icons/pi";

const Tablepicker = ({ tables, formData, setFormData }) => {
  // Function to handle changes in the radio input
  // const handleRadioChange = (e) => {
  //   // setFormData({ ...formData, tableNumber: +e.table.name });
  //   setFormData({ ...formData, tableId: e.target.value });
  //   // setSelectedTable(e.target.value);
  //   console.log(formData.tableId);
  // };

  const handleRadioChange = (e) => {
    const tableId = e.target.value;
    console.log(tableId);

    // Map the selected tableId to the corresponding orderedTableId
    // const orderedTableId = tables.find(
    //   (table) => table.id === tableId
    // )?.orderedTableId;
    const selectedTable = tables.find((table) => table.id === tableId);

    setFormData((prevData) => ({
      ...prevData,
      orderItems: [
        {
          orderedTableId: tableId, // Set orderedTableId dynamically
          lineItems: null,
          //   [
          //   {
          //     numberOfItems: ,
          //     drinkCategoryId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          //   },
          // ],
        },
      ],
      tableId, // Set tableId in formData
    }));
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
