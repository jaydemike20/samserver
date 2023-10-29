import React from "react";
import { Route as ReactRouterRoute, Navigate } from "react-router-dom";

const CustomRoute = ({ path, element }) => {
  const basename = "/samserver"; // Your basename

  if (path.startsWith("/")) {
    path = `${basename}${path}`;
  }

  return <ReactRouterRoute path={path} element={element} />;
};

export default CustomRoute;