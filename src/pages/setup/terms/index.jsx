import React from "react";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleDrawer } from "../../../services/store/disclosureSlice";
import { OpenTerms } from "../../../components/Lottie-Components";

const Terms = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isHomePage = pathname === "/terms";
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
          <OpenTerms text={"Terms"} />
        </Box>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Terms;
