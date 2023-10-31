// import React from "react";
// import { PiCheck } from "react-icons/pi";

// const Tablepicker = ({ onRadioChange, tables, formData }) => {
//   const handleRadioChange = (table) => {
//     onRadioChange(table);
//   };

//   return (
//     <ul className="px-3">
//       {tables.map((table) => (
//         <li className="flex justify-between" key={table.id}>
//           <input
//             type="radio"
//             id={table.id}
//             name="tables"
//             value={table.id}
//             onChange={handleRadioChange}
//             className="hidden peer"
//             required
//           />
//           <label
//             htmlFor={table.id}
//             className={`inline-flex items-center justify-between w-full py-2 cursor-pointer font-semibold ${
//               formData.tableId === table.id ? "peer-checked:text-primary" : ""
//             }`}
//           >
//             <div className="flex items-center w-full justify-between">
//               <p>{table.name}</p>
//               {formData.tableId === table.id && <PiCheck />}
//             </div>
//           </label>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default Tablepicker;

import React from "react";
import { PiCheck } from "react-icons/pi";

const Tablepicker = ({ onRadioChange, tables, formData }) => {
  const handleRadioChange = (tableId) => {
    // Call the parent component's function to handle the radio button change
    onRadioChange(tableId);
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
            onChange={() => handleRadioChange(table.id)} // Pass the table id to the handler
            checked={formData.tableId === table.id} // Check the radio button if the ids match
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
