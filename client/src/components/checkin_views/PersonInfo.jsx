import React, { useState } from "react";
import { FormField, FormButton } from "../FormComponents";
import IconedBox from "../IconedBox";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const PersonInfo = ({ handleViewSubmit, parkingLocation }) => {
  const [name, setName] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [saveInfo, setSaveInfo] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePersonInfoSubmit = ({ direction, view }) => {
    const today_as_str = moment().format("YYYY-MM-DD");
    const departure_as_datetime = moment(`${today_as_str} ${departureTime}`);

    handleViewSubmit({
      direction,
      view,
      data: {
        name,
        departureTime: departure_as_datetime.toISOString(),
        saveInfo,
        phoneNumber,
      },
    });
  };

  return (
    <div className="flex flex-col justify-around w-full h-full">
      <IconedBox icon={faCircleInfo}>
        You are parking in the {parkingLocation}
      </IconedBox>
      <FormField
        name="phoneNumber"
        label="Phone Number"
        placeholder="phone number"
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <FormField
        name="name"
        label="Name"
        placeholder="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <FormField
        name="departureTime"
        label="Time"
        type="time"
        value={departureTime}
        onChange={(e) => {
          setDepartureTime(e.target.value);
        }}
      />
      <FormField
        name="saveInfo"
        label="Save my info for next time"
        type="checkbox"
        value={saveInfo}
        onChange={(e) => setSaveInfo(e.target.value)}
        className="flex flex-row-reverse gap-2 justify-end"
      />
      <div>
        <FormButton
          style="primary"
          onClick={() =>
            handlePersonInfoSubmit({ direction: 1, view: "submit" })
          }
        >
          Register
        </FormButton>
        <FormButton
          onClick={() =>
            handlePersonInfoSubmit({ direction: -1, view: "parking-info" })
          }
        >
          Back
        </FormButton>
      </div>
    </div>
  );
};

export default PersonInfo;
