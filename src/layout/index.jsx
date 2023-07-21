import React from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { useDisclosure } from "../hooks/useDisclosure";
import { Header } from "./components/Header";
import { NavigationMain } from "./components/Navigation-Components";
import { useSelector } from "react-redux";

const Layout = () => {
  const adjustNavButtonsHeight = useMediaQuery("(min-height:735px)");
  const path = useLocation();
  const fullname = useSelector((state) => state.fullname.fullname);
  const theme = useTheme();

  const {
    isOpen: isDrawer,
    onClose: closeDrawer,
    onToggle: toggleDrawer,
  } = useDisclosure();

  const headerHeight = 4;
  const subNavigationHeight = 8;

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
          <Box bgcolor={theme.palette.secondary.main} width="40px">
            Hi
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
                flexDirection: path.pathname === "/" ? "row" : "",
              }}
            >
              {path.pathname === "/" && (
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
                width={path.pathname === "/" ? "70%" : "100%"}
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
