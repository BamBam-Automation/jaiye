import React, { useState } from "react";
import DrinkOptions from "./DrinkOptions";

const Accordion = ({
  formData,
  setFormData,
  sections,
  tableIsOpen,
  setTableIsOpen,
  timeIsOpen,
  setTimeIsOpen,
  mapVisible,
  setMapVisible,
}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
    if (tableIsOpen === true) {
      setTableIsOpen(!tableIsOpen);
    }
    if (timeIsOpen === true) {
      setTimeIsOpen(!timeIsOpen);
    }
    if (mapVisible === true) {
      setMapVisible(!mapVisible);
    }
  };

  return (
    <div>
      {sections.map((section, index) => (
        <div className="border-b grid gap-3 p-2 py-5" key={index}>
          <div
            className={`accordion-header ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={() => handleAccordionClick(index)}
          >
            {section.header}
          </div>
          {activeIndex === index && (
            <div className="accordion-content">{section.content}</div>
          )}

          {section.table &&
            section.table.drinkOptions && ( // Check if table and drinkOptions exist
              <DrinkOptions
                drinks={section.table.drinkOptions}
                formData={formData}
                setFormData={setFormData}
              />
            )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
