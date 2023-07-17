import React from "react";
import { useTheme } from "@emotion/react";
import { Box, Paper } from "@mui/material";
import Lottie from "lottie-react";
import loginBackgroundAnimation from "../../assets/login-background.json";

const Login = () => {
  const theme = useTheme();

  const pageBackground = {
    background:
      "linear-gradient(90deg, rgba(69,44,99,1) 4%, rgba(230,230,250,1) 21%, rgba(69,44,99,1) 87%, rgba(132,116,158,1) 98%)",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const loginPaper = {
    border: "1px",
    borderColor: "blue",
    background: "yellow",
    width: "44%",
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
  };

  return (
    <>
      <Box sx={pageBackground}>
        <Paper elevation={20} sx={loginPaper}>
          <Box bgcolor='blue' width='100%'>HERE</Box>
          <Box bgcolor='red' width='100%'>HERE</Box>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
