import React from "react";
import Img from "../images/GroupWelcomeOne.svg";
import ImgTwo from "../images/GroupWelcomeTwo.svg";
import Jaiye from "../images/Jaiye.svg";
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="grid relative p-7 h-screen">
      <img className="absolute top-12" src={Img} alt="" />
      <img className="absolute bottom-12 right-0" src={ImgTwo} alt="" />
      <div className="self-center mt-36 grid justify-items-center">
        <div className="relative">
          <img
            className="motion-safe:animate-ping absolute"
            src={Jaiye}
            alt=""
          />
          <img src={Jaiye} alt="" />
        </div>
        <h3 className="text-7xl font-bold">Jaiye</h3>
        <h6 className="font-medium text-[#afafaf]">Explore the Nights</h6>
      </div>
      <Button
        className="bg-primary self-end"
        onClick={() => navigate("/location")}
      >
        Get Started <span>&#8594;</span>
      </Button>
    </div>
  );
};

export default Welcome;
