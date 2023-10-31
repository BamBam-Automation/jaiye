import React from "react";

const DrinkPicker = ({ selectedTable }) => {
  return (
    <div className="space-y-3">
      <h4 className="text-2xl font-bold">Select Drinks</h4>
      {selectedTable &&
        selectedTable.drinkOptions &&
        selectedTable.drinkOptions.length > 0 && (
          <div>
            <p>Drinks available for {selectedTable.name}:</p>
            <ul>
              {selectedTable.drinkOptions.map((drink, index) => (
                <li key={index}>{drink.name}</li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
};

export default DrinkPicker;
