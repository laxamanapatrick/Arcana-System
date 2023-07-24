import React, { useEffect } from "react";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header } from "./components/Header";
import { NavigationMain } from "./components/Navigation-Components";
import { useSelector } from "react-redux";
import { getIconElement } from "../components/Get-Icon";

const Layout = ({ isDrawer, closeDrawer, toggleDrawer }) => {
  const adjustNavButtonsHeight = useMediaQuery("(min-height:735px)");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const fullname = useSelector((state) => state.fullname.fullname);
  const theme = useTheme();
  const permissions = useSelector((state) => state.permissions.permissions);

  const headerHeight = 4;
  const subNavigationHeight = 8;

  const sidebarNavigation = useSelector(
    (state) => state.sidebarNavigation.sidebarNavigation
  );

  const permittedSidebar = sidebarNavigation?.filter((item) =>
    permissions.includes(item.name)
  );

  // console.log(permittedSidebar);

  // useEffect(() => {
  //   if (permittedSidebar?.some((item) => item.path !== pathname)) {
  //     navigate("/");
  //   }
  // }, [pathname, permittedSidebar]);

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
              <Link to={item.path} key={i}>
                <IconButton>{getIconElement(item.icon)}</IconButton>
              </Link>
            ))}
          </Box>
          <Box display="flex" flexDirection="column" height="100%" width="100%">
            <Box
              height={`${subNavigationHeight}%`}
              maxHeight={`${subNavigationHeight}%`}
              display="flex"
              alignItems="center"
              color={theme.palette.secondary.main}
              px={2}
            >
              <Typography sx={{ textDecoration: "underline" }}>
                Sub Navigation
              </Typography>
            </Box>
            <Paper
              elevation={20}
              sx={{
                height: `${100 - subNavigationHeight}%`,
                maxHeight: `${100 - subNavigationHeight}%`,
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
                border="1px solid white"
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
