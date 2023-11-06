import React, { useState } from "react";
import IconedBox from "../IconedBox";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const ParkingLocation = ({ handleViewSubmit }) => {
  const handleParkingLocationClick = (location) => {
    handleViewSubmit({
      direction: 1,
      view: "parking-info",
      data: {
        parkingLocation: location,
      },
    });
  };

  return (
    <div className="flex flex-col justify-around h-full">
      <IconedBox icon={faCircleInfo}>
        Please park in the rear if you are first to arrive
      </IconedBox>
      <div className="flex flex-col gap-5">
        <span>Select your parking position</span>
        <div
          className="flex"
          onClick={() => handleParkingLocationClick("front")}
        >
          <div className="bg-gray-200 w-3/4 py-12 px-4">
            In front of someone
          </div>
          <div className="bg-gray-400 w-1/4"></div>
        </div>
        <div
          className="flex"
          onClick={() => handleParkingLocationClick("rear")}
        >
          <div className="bg-gray-200 w-3/4 py-12 px-4">In the rear</div>
          <div className="bg-gray-400 w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default ParkingLocation;
