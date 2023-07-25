import React from "react";
import { Menu } from "@mui/icons-material";
import { Box, IconButton, Paper, useTheme } from "@mui/material";

export const Header = ({ toggleDrawer }) => {
  const theme = useTheme();
  return (
    <>
      <Paper elevation={20} sx={{ background: "transparent", border: "none" }}>
        <Box
          
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <IconButton onClick={toggleDrawer} sx={{ m: 0}}>
            <Menu sx={{ color: theme.palette.secondary.main }} />
          </IconButton>
        </Box>
      </Paper>
    </>
  );
};
