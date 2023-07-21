import React from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { sampleSidebar } from "../../mockData";
import { useNavigate } from "react-router-dom";
import { Close, Logout } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

const NavigationHeader = ({ onClose }) => {
  const theme = useTheme();
  const changeLogo = useMediaQuery("(max-width: 1024px)");
  return (
    <>
      <Box width="auto">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          gap={0}
        >
          <div></div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={
                changeLogo
                  ? "./images/SystemLogo.png"
                  : "./images/SystemLogoName.png"
              }
              alt="logo"
              loading="lazy"
              style={{
                minWidth: "35%",
                maxWidth: "40%",
                padding: 0,
                margin: 0,
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              top: 0,
              right: 0,
            }}
          >
            <IconButton onClick={onClose}>
              <Close sx={{ color: theme.palette.primary.main }} />
            </IconButton>
          </div>
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
      <Box width="100%">
        <Button
          fullWidth
          sx={{ color: "#30004D" }}
          startIcon={<Logout sx={{ transform: "rotate(180deg)" }} />}
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
      <Stack flexGrow={1} mt={2} maxHeight="48%" sx={{ overflowY: "auto" }}>
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
                <ListItemText
                  primary={item.name}
                  sx={{ color: "black", fontSize: "10px" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Stack>
    </>
  );
};

export const NavigationMain = ({ isOpen, onClose }) => {
  const adjustHeightonDesktop = useMediaQuery("(min-height:930px)");
  const theme = useTheme();

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={onClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: 370,
            background: theme.palette.secondary.main,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            height: adjustHeightonDesktop ? "100%" : "95%",
          }}
        >
          <Stack height="100%">
            <NavigationHeader onClose={onClose} />
            <NavigationContent />
          </Stack>
          <NavigationFooter />
        </Box>
      </Drawer>
    </>
  );
};
