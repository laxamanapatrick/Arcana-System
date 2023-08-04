import React from "react";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header } from "./components/Header";
import { NavigationMain } from "./components/Navigation-Components";
import { useDispatch, useSelector } from "react-redux";
import { getIconElement } from "../components/Get-Icon";
import { toggleDrawer } from "../services/store/disclosureSlice";
import { Logout } from "@mui/icons-material";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const adjustNavButtonsHeight = useMediaQuery("(min-height:735px)");
  const { pathname } = useLocation();
  const fullname = useSelector((state) => state.fullname.fullname);
  const theme = useTheme();
  const permissions = useSelector((state) => state.permissions.permissions);

  const headerHeight = 6.5;

  const sidebarNavigation = useSelector(
    (state) => state.sidebarNavigation.sidebarNavigation
  );

  const permittedSidebar = sidebarNavigation?.filter((item) =>
    permissions?.includes(item.name)
  );

  return (
    <>
      <Stack width="100wv" height="100vh" display="flex" flexDirection="column">
        <Box
          sx={{
            maxHeight: `${headerHeight}%`,
          }}
        >
          <Header />
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          // mt={adjustNavButtonsHeight ? "1px" : "11px"}
          // height={`${100 - headerHeight}%`}
          height="100%"
        >
          <Box
            // bgcolor={theme.palette.secondary.main}
            width="60px"
            textAlign="center"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              {permittedSidebar?.map((item, i) => (
                <Link
                  to={item.path}
                  key={i}
                  onClick={() => dispatch(toggleDrawer("isSidebar"))}
                >
                  <Tooltip title={`Open ${item.name}`} placement="right-start">
                    <IconButton
                      sx={{ color: theme.palette.secondary.main, my: 1 }}
                    >
                      {getIconElement(item.icon)}
                    </IconButton>
                  </Tooltip>
                </Link>
              ))}
            </Box>
            <Box mb={2}>
              <Tooltip title={`Logout`} placement="right-start">
                <IconButton
                  sx={{ color: theme.palette.secondary.main }}
                  onClick={() => {
                    sessionStorage.clear();
                    navigate("/login");
                  }}
                >
                  <Logout sx={{ transform: "rotate(180deg)" }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" height="100%" width="100%">
            <Paper
              elevation={20}
              sx={{
                //
                borderRadius: "70px",
                //
                height: `${100}%`,
                maxHeight: `${100}%`,
                display: "flex",
                flexDirection:
                  pathname === "/admin-dashboard" || "/user-dashboard" || "/"
                    ? "row"
                    : "",
              }}
            >
              {pathname === "/" && (
                <Box
                  width="30%"
                  bgcolor="whitesmoke"
                  border="1px solid white"
                  color={theme.palette.secondary.main}
                >
                  {fullname}
                </Box>
              )}
              <Box
                bgcolor={theme.palette.common.white}
                // border="1px solid white"
                width={pathname === "/" ? "70%" : "100%"}
              >
                <Outlet />
              </Box>
            </Paper>
          </Box>
        </Box>
      </Stack>
      <NavigationMain />
    </>
  );
};

export default Layout;
