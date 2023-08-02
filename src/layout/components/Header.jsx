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
    <Paper elevation={20} sx={{ background: "transparent", border: "none", pl: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          padding: "8px", // Add some padding for better spacing
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
            marginRight: 8, // Increase the margin for better spacing
          }}
        />
        <Typography
          variant="h6" // Set the variant to 'h6' for a prominent header
          component="div" // Use 'div' as the component for better alignment
          color="primary" // Set the font color to the primary color
          fontFamily="Montserrat, sans-serif" // Use a custom font family
          fontWeight="bold" // Make the text bold
        >
          Arcana
        </Typography>
      </Box>
    </Paper>
  );
};

export default Header;
