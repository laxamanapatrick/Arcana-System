import { Box } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { toggleDrawer } from "../../../services/store/disclosureSlice";
import { OpenInventory } from "../../../components/Lottie-Components";

const Inventory = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isHomePage = pathname === "/inventory";
  return (
    <>
      {isHomePage ? (
        <Box
          onClick={() => dispatch(toggleDrawer("isSidebar"))}
          sx={{
            cursor: "pointer",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <OpenInventory text={'Open Inventory Modules'} />
        </Box>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Inventory;
