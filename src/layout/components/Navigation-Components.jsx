import React from "react";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { sampleSidebar } from "../../mockData";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";

const NavigationHeader = () => {
  const changeLogo = useMediaQuery("(max-width: 1024px)");
  return (
    <>
      <Box width="auto">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          gap={0}
        >
          <img
            src={
              changeLogo
                ? "./images/SystemLogo.png"
                : "./images/SystemLogoName.png"
            }
            alt="logo"
            loading="lazy"
            style={{ minWidth: "35%", maxWidth: "40%", padding: 0, margin: 0 }}
          />
        </Box>
      </Box>
    </>
  );
};

const NavigationFooter = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <Box width="auto">
        <Button
          fullWidth
          sx={{ color: "#30004D" }}
          startIcon={<Logout />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </>
  );
};

const NavigationContent = () => {
  return (
    <>
      <Stack height="90%" mt={2}>
        <List>
          {sampleSidebar?.map((item, i) => (
            <ListItem
              key={i}
              disablePadding
              sx={{ textTransform: "uppercase" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  //   justifyContent: open ? "initial" : "center",
                  alignItems: "center",
                  px: 2.5,
                  gap: 1,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    // mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "black",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Stack>
    </>
  );
};

export const NavigationMain = ({ isOpen, onClose }) => {
  return (
    <Drawer open={isOpen} onClose={onClose}>
      <Paper
        elevation={20}
        sx={{ height: "100%", background: "#FFFF", color: "black" }}
      >
        <Stack display="flex" justifyContent="space-between" height="100%">
          <NavigationHeader />
          <NavigationContent />
          <Stack>
            <NavigationFooter />
          </Stack>
        </Stack>
      </Paper>
    </Drawer>
  );
};
