import React from "react";
import { Menu } from "@mui/icons-material";
import { Box, IconButton, Paper, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleDrawer } from "../../services/store/disclosureSlice";
import systemLogo from "../../assets/images/SystemLogo.png";

export const Header = () => {
  const dispatch = useDispatch();
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
          <IconButton
            onClick={() => dispatch(toggleDrawer("isSidebar"))}
            sx={{ m: 0 }}
          >
            <Menu sx={{ color: theme.palette.secondary.main }} />
          </IconButton>
          
            <img
              src={systemLogo}
              alt="logo"
              loading="lazy"
              style={{
                minWidth: "30px",
                maxWidth: "30px",
                padding: 0,
                marginRight: 3,
              }}
            />
        </Box>
      </Paper>
    </>
  );
};
