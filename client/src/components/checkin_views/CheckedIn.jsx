import React from "react";
import IconedBox from "../IconedBox";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const CheckedIn = ({ info }) => {
  return (
    <div>
      <IconedBox icon={faCircleInfo}>Registered Successfully</IconedBox>
      <div>
        <strong>Front Car Info</strong>
        <div>No one has registered in Front of you yet</div>
      </div>
      <div>
        <strong>My info</strong>
        <div>Parking Spot {info.parkingSpot}</div>
        <div>
          {info.name} {info.phoneNumber}
        </div>
        <div>Planned departure {info.departureTime} </div>
      </div>
    </div>
  );
};

export default CheckedIn;
