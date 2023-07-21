import React from "react";
import useFormSetup from "../../hooks/useFormSetup";
import { Textfield } from "../../components/Fields";
import { Box, Paper, Typography, useMediaQuery } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDefaultStyles } from "../../hooks/useDefaultStyles";
import { loginSchema, loginValues } from "../../schema";
import { useCreateLoginMutation } from "../../services/api";
import { ResponseToast } from "../../components/Lottie-Components";
import { useDispatch } from "react-redux";
import { setToken, setFullname } from "../../services/store/loginSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [
    createLogin,
    { data: response, error: errorResponse, isLoading, isError, isSuccess },
  ] = useCreateLoginMutation();

  const showLogo = useMediaQuery("(min-width:1021px)");

  const { handleSubmit, control, errors, isValid } = useFormSetup({
    schema: loginSchema,
    defaultValues: loginValues,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      const res = await createLogin(data).unwrap();
      dispatch(setFullname(res?.data?.fullname));
      dispatch(setToken(res?.data?.token));
      window.setTimeout(() => {
        navigate("/");
      }, 400);
    } catch (error) {
      console.log(error);
    }
  };

  const { defaultTextFieldStyle, defaultButtonStyle } = useDefaultStyles();
  const pageBackground = {
    background: "#6c5982",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  const loginPaper = {
    background: showLogo
      ? "linear-gradient(90deg, rgba(255,255,255,1) 32%, rgba(35,2,74,1) 93%)"
      : "transparent",
    maxWidth: "48%",
    minWidth: "35%",
    borderRadius: "10px",
    height: "47vh",
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
  };

  const boxLogoStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const boxStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <>
      {isError && (
        <ResponseToast text={errorResponse?.data?.messages[0]} status="error" />
      )}
      {isSuccess && (
        <ResponseToast text={response?.messages[0]} status="success" />
      )}
      <Box sx={pageBackground}>
        <Paper elevation={20} sx={loginPaper}>
          {showLogo ? (
            <Box sx={boxLogoStyle} borderRadius="10px 0 0 10px">
              <img
                src={"./images/SystemLogoName.png"}
                alt="logo"
                loading="lazy"
                style={{ width: "auto", height: "70%" }}
              />
            </Box>
          ) : (
            ""
          )}
          <Box
            sx={{ ...boxStyle, ...defaultButtonStyle }}
            borderRadius="0 10px 10px 0"
            flexDirection="column"
            gap={2}
            mx={1}
          >
            {!showLogo ? (
              <Box
                sx={boxLogoStyle}
                borderRadius="10px 0 0 10px"
                flexDirection="column"
              >
                <img
                  src={"./images/SystemLogo.png"}
                  alt="logo"
                  loading="lazy"
                  style={{ width: "20%", height: "100%" }}
                />
                <Typography variant="h7" color="white" textAlign="center">
                  Arcana
                </Typography>
              </Box>
            ) : (
              ""
            )}
            <form onSubmit={handleSubmit(submitHandler)}>
              <Box sx={boxStyle} gap={2} flexDirection="column">
                <>
                  <Textfield
                    sx={defaultTextFieldStyle}
                    name="username"
                    control={control}
                    label="Username"
                    size="small"
                    autoComplete="off"
                    error={!!errors?.username}
                    helperText={errors?.username?.message}
                  />
                  <Textfield
                    sx={defaultTextFieldStyle}
                    name="password"
                    control={control}
                    label="Password"
                    size="small"
                    autoComplete="off"
                    error={!!errors?.password}
                    helperText={errors?.password?.message}
                    type="password"
                  />
                </>
                <LoadingButton
                  fullWidth
                  className={`primaryButtons ${
                    !isValid ? "notAllowedCursor" : ""
                  }`}
                  type="submit"
                  loading={isLoading}
                >
                  Submit
                </LoadingButton>
              </Box>
            </form>
          </Box>
        </Paper>
        <Box
          sx={boxLogoStyle}
          borderRadius="10px 0 0 10px"
          mt={1}
          flexDirection="column"
        >
          <img
            src={"./images/MIS-logo.png"}
            alt="logo"
            loading="lazy"
            style={{ width: "4%", height: "100%" }}
          />
          <Typography
            variant="h7"
            fontSize={showLogo ? "" : "10px"}
            color="white"
            textAlign="center"
          >
            &#169; 2023 Powered by <br /> Management Information System
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Login;
