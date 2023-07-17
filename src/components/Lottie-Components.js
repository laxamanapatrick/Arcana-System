import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Lottie from "lottie-react";
import noDataFound from "../assets/no-data.json";
import zeroRecordsFound from "../assets/zero-records.json";
import loadingData from "../assets/loading-data.json";
import submittingData from "../assets/submitting-data.json";
import successResponse from "../assets/success-response.json";
import errorResponse from "../assets/error-response.json";
import warningResponse from "../assets/warning-response.json";

const StyledBox = styled(Box)(() => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 9999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  opacity: 0.92,
  flexDirection: "column",
}));

const StyledToast = styled(Box)(({ backgroundColor }) => ({
  position: "fixed",
  top: "5px",
  right: "5px",
  zIndex: 9999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: backgroundColor,
  color: "#f0eded",
  borderRadius: "8px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  width: "300px",
  height: "auto",
  wordWrap: "break-word",
  padding: "25px 45px",
}));

export const NoDataFound = ({ text }) => {
  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.95,
        flexDirection: "column",
      }}
    >
      <Lottie
        animationData={noDataFound}
        style={{ height: "40%", width: "40%" }}
      />
      {text && (
        <Typography variant="h5" color="gray" fontSize='20px'>
          {text}
        </Typography>
      )}
    </Box>
  );
};

export const ZeroRecordsFound = ({ text }) => {
  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.95,
        flexDirection: "column",
      }}
    >
      <Lottie
        animationData={zeroRecordsFound}
        style={{ maxHeight: "35%", maxWidth: "35%" }}
      />
      {text && (
        <Typography variant="h5" color="gray" fontSize='20px'>
          {text}
        </Typography>
      )}
    </Box>
  );
};

export const LoadingData = ({ text }) => {
  return (
    <StyledBox>
      <Lottie animationData={loadingData} style={{ padding: 0, margin: 0 }} />
      {text && (
        <Typography variant="h5" color="teal">
          {text}
        </Typography>
      )}
    </StyledBox>
  );
};

export const SubmittingData = ({ text }) => {
  return (
    <StyledBox sx={{ background: "#b1b3b5" }}>
      <Lottie
        animationData={submittingData}
        style={{ padding: 0, margin: 0 }}
      />
      {text && (
        <Typography variant="h5" color="teal">
          {text}
        </Typography>
      )}
    </StyledBox>
  );
};

export const ResponseToast = ({ text, status }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    let animation = null;

    switch (status) {
      case "success":
        animation = successResponse;
        break;
      case "error":
        animation = errorResponse;
        break;
      case "warning":
        animation = warningResponse;
        break;
      default:
        animation = null;
        break;
    }

    setAnimationData(animation);

    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [status]);

  if (!isVisible) {
    return null;
  }

  const getColorScheme = () => {
    let backgroundColor;
    let textColor;
    
    switch (status) {
      case "success":
        backgroundColor = "green";
        textColor = "black";
        break;
      case "error":
        backgroundColor = "red";
        textColor = "white";
        break;
      case "warning":
        backgroundColor = "yellow";
        textColor = "white";
        break;
      default:
        backgroundColor = "white";
        textColor = "white";
        break;
    }
    
    return { backgroundColor, textColor };
  };
  
  const { backgroundColor, textColor } = getColorScheme();

  return (
    <StyledToast backgroundColor={backgroundColor}>
      {animationData && (
        <Lottie
          animationData={animationData}
          style={{ padding: 0, margin: 0 }}
          loop={false}
          autoplay={true}
          rendererSettings={{
            preserveAspectRatio: "xMidYMid slice",
          }}
        />
      )}
      {text && (
        <Typography variant="h5" color={textColor}>
          {text}
        </Typography>
      )}
    </StyledToast>
  );
};

