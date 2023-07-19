import React from "react";
import { Box, Stack } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { Header, Navigation } from "./components";
import { useDisclosure } from "../hooks/useDisclosure";

const Layout = () => {
  const path = useLocation();

  const {
    isOpen: isDrawer,
    onClose: closeDrawer,
    onToggle: toggleDrawer,
  } = useDisclosure();

  return (
    <>
      <Stack width="100wv" height="100vh" display="flex" flexDirection="column">
        <Box height="4%">
          <Header toggleDrawer={toggleDrawer} />
        </Box>
        {isDrawer && (
          <Box width="15%" bgcolor="whitesmoke">
            <Navigation isOpen={isDrawer} onClose={closeDrawer} />
          </Box>
        )}
        <Box height="100%">
          {path.pathname === "/" && (
            <Box width="30%" height="100%" bgcolor="#979598">
              present only on dashboard
            </Box>
          )}
          <Box
            height="auto"
            bgcolor="#552888"
            width={path.pathname === "/" ? "70%" : "100%"}
          >
            <Outlet />
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default Layout;
