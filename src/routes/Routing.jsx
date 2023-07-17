import React from "react";
import { useRoutes } from "react-router-dom";
import Login from "../pages/login/Login";

const Routing = () => {
  let routing = useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return routing;
};

export default Routing;
