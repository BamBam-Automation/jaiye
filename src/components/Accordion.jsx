import React, { useState } from "react";

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
        </div>
      ))}
    </div>
  );
};

export default Accordion;
