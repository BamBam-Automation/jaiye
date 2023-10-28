import React from "react";
import { PiCheck } from "react-icons/pi";

const DrinkOptions = ({ drinks, formData, setFormData, drinkCategoryId }) => {
  const handleRadioChange = (selectedDrinkId) => {
    // Update the selected drink option in your formData
    setFormData({
      ...formData,
      orderItems: [
        {
          ...formData.orderItems[0], // Assuming there's only one order item
          lineItems: [
            {
              ...formData.orderItems[0].lineItems[0], // Assuming there's only one line item
              drinkCategoryId: selectedDrinkId, // Update drinkCategoryId here
            },
          ],
        },
      ],
    });
  };

  return (
    <ul className="px-3">
      {drinks.map((drink) => (
        <li className="flex justify-between" key={drink.id}>
          <input
            type="radio"
            id={drink.id}
            name="drinks"
            value={drink.drinkCategoryId} // Pass the correct value to the handler
            onChange={() => handleRadioChange(drink.drinkCategoryId)} // Pass the drinkCategoryId
            className="hidden peer"
            required
          />
          <label
            htmlFor={drink.id}
            className={`inline-flex items-center justify-between w-full py-2 cursor-pointer font-semibold ${
              drinkCategoryId === drink.drinkCategoryId
                ? "peer-checked:text-primary"
                : ""
            }`}
          >
            <div className="flex items-center w-full justify-between">
              <p>{drink.drinkCategoryName}</p>
              {drinkCategoryId === drink.drinkCategoryId && <PiCheck />}
            </div>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default DrinkOptions;
