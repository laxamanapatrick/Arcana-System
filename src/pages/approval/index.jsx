import React from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { toggleDrawer } from "../../services/store/disclosureSlice";
import { OpenApproval } from "../../components/Lottie-Components";

const Approval = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isHomePage = pathname === "/approval";
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
          <OpenApproval text={"Approval Module"} />
        </Box>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Approval;
