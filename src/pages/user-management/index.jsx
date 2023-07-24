import { Button } from "@mui/material";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const UserManagement = ({ toggleDrawer }) => {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/user-management";
  return (
    <>
      {isHomePage ? (
        <>
          <Button onClick={toggleDrawer}>Open User Management Modules</Button>
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default UserManagement;
