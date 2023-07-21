import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/login/Login";
import { useSelector } from "react-redux";
import Layout from "../layout";

const AuthenticatedRoutes = () => {
  const fullname = useSelector((state) => state.fullname.fullname);

  return !fullname ? <Navigate to="/login" /> : <Layout />;
};

const Routing = () => {
  let routing = useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <AuthenticatedRoutes />,
    },
  ]);

  return routing;
};

export default Routing;
