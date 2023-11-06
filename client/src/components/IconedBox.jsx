import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconedBox = ({ children, icon }) => {
  return (
    <div className="flex py-3 p-4 w-full bg-gray-100 items-center gap-2">
      <FontAwesomeIcon icon={icon} className="pr-4" />
      {children}
    </div>
  );
};

export default IconedBox;
