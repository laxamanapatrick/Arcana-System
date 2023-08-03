import React from "react";
import { Menu } from "@mui/icons-material";
import { Box, IconButton, Paper, Typography, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleDrawer } from "../../services/store/disclosureSlice";
import systemLogo from "../../assets/images/SystemLogo.png";

export const Header = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <Box
      // <Paper
      // elevation={20}
      sx={{ background: "transparent", border: "none", pl: 1 }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          padding: "8px",
        }}
      >
        <IconButton
          onClick={() => dispatch(toggleDrawer("isSidebar"))}
          // sx={{ mr: 0 }}
          sx={{ mr: 2 }}
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
            marginRight: 8,
          }}
        />
        <Typography
          variant="h6"
          component="div"
          color="primary"
          fontFamily="Montserrat, sans-serif"
          fontWeight="bold"
        >
          Arcana
        </Typography>
      </Box>
      {/* </Paper> */}
    </Box>
  );
};

export default Header;
