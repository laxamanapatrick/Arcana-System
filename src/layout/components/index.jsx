import React from "react";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { Box, IconButton, Paper } from "@mui/material";
import { NavigationMain } from "./Navigation-Components";

export const Header = ({ toggleDrawer }) => {
  return (
    <>
      <Paper>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton onClick={toggleDrawer}>
            <WidgetsIcon sx={{ color: "white" }} />
          </IconButton>
          <Box></Box>
        </Box>
      </Paper>
    </>
  );
};

export const Navigation = ({ isOpen, onClose }) => {
  return (
    <>
      <NavigationMain isOpen={isOpen} onClose={onClose} />
    </>
  );
};
