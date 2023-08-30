import React from "react";
import { Textfield } from "../../components/Fields";
import { Box, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDefaultStyles } from "../../hooks/useDefaultStyles";
import { loginSchema } from "../../schema";
import { useCreateLoginMutation } from "../../services/api";
import { useDispatch } from "react-redux";
import { setToken, setFullname } from "../../services/store/loginSlice";
import { useNavigate } from "react-router-dom";
import { BasicToast } from "../../components/SweetAlert-Components";
import { SetSidebarNavigation } from "../../services/store/navigationSlice";
import { sidebarNavigationData } from "../../routes/navigationData";
import { setPermissions } from "../../services/store/permissionSlice";
import systemLogo from "../../assets/images/SystemLogo.png";
import systemLogoName from "../../assets/images/SystemLogoName.png";
import misLogo from "../../assets/images/MIS-logo.png";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const Login = () => {
  const theme = useTheme();
  const [createLogin, { isLoading }] = useCreateLoginMutation();

  const showLogo = useMediaQuery("(min-width:1021px)");

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      const res = await createLogin(data).unwrap();
      // if (res?.data?.permission?.includes("Admin Dashboard")) {
      //   navigate("/admin-dashboard");
      //   return;
      // }
      // if (res?.data?.permission?.includes("Dashboard")) {
      //   navigate("/user-dashboard");
      //   return;
      // } else {
      navigate("/");
      // }
      BasicToast("success", `Welcome ${res?.data?.fullname}`, 700);
      dispatch(setFullname(res?.data?.fullname));
      dispatch(setToken(res?.data?.token));
      dispatch(setPermissions(res?.data?.permission));
      dispatch(SetSidebarNavigation(sidebarNavigationData));
      reset();
    } catch (error) {
      BasicToast("error", error?.data?.messages[0], 2000);
    }
  };

  const { defaultButtonStyle } = useDefaultStyles();
  const pageBackground = {
    // background: "linear-gradient(120deg, rgba(135,143,196,1) 10%, rgba(149,113,167,1) 41%, rgba(149,113,167,1) 78%)",
    background: "linear-gradient(120deg, rgba(229,229,229,1) 10%, rgba(204,164,224,1) 39%, rgba(229,229,229,1) 78%)",
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
    background: 
    // showLogo
    //   ? 
      // "linear-gradient(90deg, rgba(255,255,255,1) 32%, rgba(35,2,74,1) 93%)",
      // "linear-gradient(120deg, rgba(229,229,229,1) 10%, rgba(204,164,224,1) 39%, rgba(229,229,229,1) 78%)",
      // "#E5E5E5",
      // : 
      "transparent",
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

  const loginFields = {
    "& .MuiInputBase": {
      color: `${theme.palette.common.white} !important`,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: `${theme.palette.secondary.main} !important`,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: `${theme.palette.common.white} !important`,
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      color: `${theme.palette.common.white} !important`,
      borderColor: `${theme.palette.common.white} !important`,
    },
    "&.Mui-active .MuiOutlinedInput-notchedOutline": {
      color: `${theme.palette.common.white} !important`,
      borderColor: `${theme.palette.common.white} !important`,
    },
    "& .MuiInputLabel": {
      color: `${theme.palette.common.black} !important`,
    },
    "& .MuiOutlinedInput-notchedOutline .Mui-focused::placeholder": {
      color: `${theme.palette.common.black} !important`,
    },
  };

  return (
    <>
      <Box sx={pageBackground}>
        <Paper elevation={20} sx={loginPaper}>
          {showLogo ? (
            <Box sx={boxLogoStyle} borderRadius="10px 0 0 10px">
              <img
                src={systemLogoName}
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
                  src={systemLogo}
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
                    sx={loginFields}
                    name="username"
                    control={control}
                    label="Username"
                    size="small"
                    autoComplete="off"
                    error={!!errors?.username}
                    helperText={errors?.username?.message}
                  />
                  <Textfield
                    sx={loginFields}
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
                  Sign In
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
            src={misLogo}
            alt="logo"
            loading="lazy"
            style={{ width: "4%", height: "100%" }}
          />
          <Typography
            variant="h7"
            fontSize={showLogo ? "" : "10px"}
            // color={theme.palette.common.white}
            color={theme.palette.secondary.main}
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
