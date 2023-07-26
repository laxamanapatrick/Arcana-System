import React from "react";
import { Button } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleDrawer } from "../../../services/store/disclosureSlice";

const Setup = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation();
  const isHomePage = pathname === "/setup";
  return (
    <>
      {isHomePage ? (
        <>
          <Button onClick={() => dispatch(toggleDrawer("isSidebar"))}>Open Setup Modules</Button>
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};
export default Setup;
