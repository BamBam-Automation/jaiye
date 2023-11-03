const ClubPage = ({ selectedTable, setDrinkDropdownVisible }) => {
  // Other code ...

  // const handleShowDrinks = () => {
  //   setDrinkDropdownVisible(!drinkDropdownVisible);
  // };

  // Handle selecting a drink option and close the dropdown
  const handleSelectDrink = (drink) => {
    // Add your logic to handle the selected drink
    // ...

    // Close the dropdown
    setDrinkDropdownVisible(false);
  };

  return (
    <div>
      <p>Available Drinks:</p>
      <ul>
        {selectedTable && selectedTable.length > 0 ? (
          selectedTable.map((drink, index) => (
            <li key={index} onClick={() => handleSelectDrink(drink)}>
              {drink.drinkCategoryName}
            </li>
          ))
        ) : (
          <li>No drinks available, please select a table</li>
        )}
      </ul>
    </div>
  );
};

export default ClubPage;
