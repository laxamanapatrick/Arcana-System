import React from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { toggleDrawer } from "../../services/store/disclosureSlice";
import { OpenCustomerRegistration } from "../../components/Lottie-Components";

const CustomerRegistration = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isHomePage = pathname === "/customer-registration";
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
          <OpenCustomerRegistration
            text={"Open Customer Registration Modules"}
          />
        </Box>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default CustomerRegistration;
