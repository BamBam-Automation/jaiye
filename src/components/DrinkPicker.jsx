import { PiCheck } from "react-icons/pi";

const DrinkPicker = ({
  selectedTable,
  setDrinkDropdownVisible,
  formData,
  setFormData,
  orderIndex,
  lineItemIndex,
  onDrinkSelect,
}) => {
  const handleSelectDrink = (drinkCategoryId) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData };
      const orderItem = updatedData.orderItems[orderIndex];
      if (orderItem) {
        const lineItem = orderItem.lineItems[lineItemIndex];
        if (lineItem) {
          lineItem.drinkCategoryId = drinkCategoryId;
        }
      }
      return updatedData;
    });

    // Close the dropdown
    setDrinkDropdownVisible(false);
  };

  return (
    <ul className="px-3">
      {selectedTable && selectedTable.length > 0 ? (
        selectedTable.map((drink, index) => (
          <li className="flex justify-between" key={drink.id}>
            <input
              type="radio"
              id={drink.id}
              name="drinks"
              value={drink.drinkCategoryId} // Pass the correct value to the handler
              onChange={() => handleSelectDrink(drink.drinkCategoryId)} // Pass the drinkCategoryId
              className="hidden peer"
              required
            />
            <label
              htmlFor={drink.id}
              className={`inline-flex items-center justify-between w-full py-2 cursor-pointer font-semibold ${
                formData.orderItems[orderIndex].lineItems[lineItemIndex]
                  .drinkCategoryId === drink.drinkCategoryId
                  ? "peer-checked:text-primary"
                  : ""
              }`}
            >
              <div className="flex items-center w-full justify-between">
                <p>{drink.drinkCategoryName}</p>
                {formData.orderItems[orderIndex].lineItems[lineItemIndex]
                  .drinkCategoryId === drink.drinkCategoryId && <PiCheck />}
              </div>
            </label>
          </li>
        ))
      ) : (
        <li>No drinks available, please select a table</li>
      )}
    </ul>
  );
};

export default DrinkPicker;
