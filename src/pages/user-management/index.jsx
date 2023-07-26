import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { toggleDrawer } from "../../services/store/disclosureSlice";

const UserManagement = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isHomePage = pathname === "/user-management";
  return (
    <>
      {isHomePage ? (
        <>
          <Button onClick={() => dispatch(toggleDrawer("isSidebar"))}>
            Open User Management Modules
          </Button>
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default UserManagement;
