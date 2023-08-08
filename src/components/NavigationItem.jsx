import React from "react";
import { NavLink } from "react-router-dom";

const NavigationItem = (props) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? "border-primary text-primary border-l-2 p-4 flex gap-3 items-center"
          : "p-4 flex gap-3 items-center text-[#848484]"
      }
      to={props.link}
    >
      {props.children}
    </NavLink>
  );
};

export default NavigationItem;
