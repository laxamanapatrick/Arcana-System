import React from "react";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleDrawer } from "../../../services/store/disclosureSlice";
import { OpenSetup } from "../../../components/Lottie-Components";

const Setup = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isHomePage = pathname === "/setup";
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
          <OpenSetup text={"Setup"} />
        </Box>
      ) : (
        <Outlet />
      )}
    </>
  );
};
export default Setup;
