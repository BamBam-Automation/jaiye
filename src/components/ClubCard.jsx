import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";
import { PiWineLight, PiClockLight } from "react-icons/pi";
import { TfiLocationArrow, TfiStar } from "react-icons/tfi";

const ClubCard = (props) => {
  return (
    <>
      <Card className="w-full h-fit">
        <CardHeader floated={false} className="m-0 rounded-b-none">
          <img className="w-full object-cover h-36" src={props.img} alt="" />
        </CardHeader>
        <CardBody>
          <h4 className="font-bold">{props.name}</h4>
        </CardBody>
        <CardFooter className="flex justify-between">
          <span className="flex">
            <PiWineLight className="h-5 w-5 text-primary" />
            <p>{props.type}</p>
          </span>
          <span className="flex">
            <TfiLocationArrow className="h-5 w-5 rotate-90 text-primary" />
            <p>{props.distance}</p>
          </span>
          <span className="flex">
            <TfiStar className="h-5 w-5 text-primary" />
            <p>{props.rating}</p>
          </span>
          {props.state && (
            <span className="flex">
              <PiClockLight className="h-5 w-5 text-primary" />
              <p>{props.time}</p>
            </span>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default ClubCard;
