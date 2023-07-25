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
import { Link, Outlet, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { NavigationMain } from "./components/Navigation-Components";
import { useSelector } from "react-redux";
import { getIconElement } from "../components/Get-Icon";

const Layout = ({ isDrawer, closeDrawer, toggleDrawer }) => {
  const adjustNavButtonsHeight = useMediaQuery("(min-height:735px)");
  const { pathname } = useLocation();
  const fullname = useSelector((state) => state.fullname.fullname);
  const theme = useTheme();
  const permissions = useSelector((state) => state.permissions.permissions);

  const headerHeight = 4;

  const sidebarNavigation = useSelector(
    (state) => state.sidebarNavigation.sidebarNavigation
  );

  const permittedSidebar = sidebarNavigation?.filter((item) =>
    permissions.includes(item.name)
  );

  return (
    <>
      <Stack width="100wv" height="100vh" display="flex" flexDirection="column">
        <Box
          sx={{
            maxHeight: `${headerHeight}%`,
          }}
        >
          <Header toggleDrawer={toggleDrawer} />
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          mt={adjustNavButtonsHeight ? "2px" : "11px"}
          height={`${100 - headerHeight}%`}
        >
          <Box
            bgcolor={theme.palette.secondary.main}
            width="40px"
            textAlign="center"
          >
            {permittedSidebar?.map((item, i) => (
              <Link to={item.path} key={i} onClick={toggleDrawer}>
                <Tooltip title={`Open ${item.name}`} placement="right-start">
                  <IconButton>{getIconElement(item.icon)}</IconButton>
                </Tooltip>
              </Link>
            ))}
          </Box>
          <Box display="flex" flexDirection="column" height="100%" width="100%">
            <Paper
              elevation={20}
              sx={{
                height: `${100}%`,
                maxHeight: `${100}%`,
                display: "flex",
                flexDirection: pathname === "/" ? "row" : "",
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
      <NavigationMain isOpen={isDrawer} onClose={closeDrawer} />
    </>
  );
};

export default Layout;
