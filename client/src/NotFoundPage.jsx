import React from "react";
import { useRouteError } from "react-router-dom";

const NotFoundPage = () => {
  const error = useRouteError();
  return (
    <div>
      <div>Error 404 not found!!</div>
      <div>{error.statusText || error.message}</div>
    </div>
  );
};

export default NotFoundPage;
