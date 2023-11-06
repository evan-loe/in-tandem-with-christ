import React, { useState } from "react";
import { FormButton } from "../FormComponents";

const ParkingInfo = ({ handleViewSubmit }) => {
  const [parkingSpot, setParkingSpot] = useState("");

  const handleParkingInfoSubmit = ({ direction, view }) => {
    handleViewSubmit({
      direction,
      view,
      data: {
        parkingSpot,
      },
    });
  };

  return (
    <div className="flex flex-col justify-around h-full">
      <div className="mb-4">Enter parking spot number</div>
      <div className="mb-4">
        <div className="flex flex-col bg-gray-100 h-72 justify-end items-center mb-8">
          <div className="mb-16">image</div>
          <div className="px-8 py-4 text-center">
            You can find the parking number on the ground
          </div>
        </div>
        <input
          name="parkingSpot"
          placeholder="Enter parking spot number"
          onChange={(e) => {
            setParkingSpot(e.target.value);
          }}
          value={parkingSpot}
          className="border-2 px-2 w-full bg-gray-200"
        />
      </div>
      <div>
        <FormButton
          style="primary"
          onClick={() =>
            handleParkingInfoSubmit({ direction: 1, view: "person-info" })
          }
        >
          Continue
        </FormButton>
        <FormButton
          onClick={() =>
            handleParkingInfoSubmit({ direction: -1, view: "parking-location" })
          }
        >
          Back
        </FormButton>
      </div>
    </div>
  );
};

export default ParkingInfo;
