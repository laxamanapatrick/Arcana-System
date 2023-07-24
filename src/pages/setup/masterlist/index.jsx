import React from "react";
import { Button } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

const Setup = ({ toggleDrawer }) => {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/setup";
  return (
    <>
      {isHomePage ? (
        <>
          <Button onClick={toggleDrawer}>Open Setup Modules</Button>
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};
export default Setup;
