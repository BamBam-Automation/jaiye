import React from "react";
import { NavLink } from "react-router-dom";

const NavigationItem = (props) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? "border-primary text-primary border-l-2 lg:border-l-0 p-4 flex gap-3 items-center lg:bg-gradient-to-r lg:from-[#EB7C4C] lg:to-[#A03484] lg:transition lg:ease-in-out lg:duration-700 lg:border-primary/70 lg:border-b-4 lg:p-3 lg:font-semibold lg:bg-clip-text lg:text-transparent"
          : "p-4 flex gap-3 items-center text-[#848484]"
      }
      to={props.link}
    >
      {props.children}
    </NavLink>
  );
};

export default NavigationItem;
