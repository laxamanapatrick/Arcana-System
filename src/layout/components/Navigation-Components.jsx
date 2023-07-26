import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Radio,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Close, ExpandMore, Logout } from "@mui/icons-material";
import { useDefaultStyles } from "../../hooks/useDefaultStyles";
import { useDispatch, useSelector } from "react-redux";
import { getIconElement } from "../../components/Get-Icon";
import {toggleDrawer} from "../../services/store/disclosureSlice"
import systemLogo from "../../assets/images/SystemLogo.png";

const NavigationHeader = () => {
  const dispatch = useDispatch()
  const theme = useTheme();
  // const changeLogo = useMediaQuery("(max-width: 1024px)");
  return (
    <>
      <Box width="auto" height="160px">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          gap={0}
        >
          <div></div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "30px",
            }}
          >
            <img
              src={systemLogo}
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
              marginBottom: "100px",
              bottom: 0,
              top: 0,
              right: 0,
            }}
          >
            <IconButton onClick={() => dispatch(toggleDrawer("isSidebar"))}>
              <Close sx={{ color: theme.palette.primary.main }} />
            </IconButton>
          </div>
        </Box>
      </Box>
    </>
  );
};

const NavigationFooter = () => {
  const { defaultButtonStyle } = useDefaultStyles();
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <Box width="100%" sx={defaultButtonStyle}>
        <Button
          className="primaryButtons"
          fullWidth
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
  const dispatch = useDispatch()
  const theme = useTheme();
  const {sidebarNavigation} = useSelector(
    (state) => state.sidebarNavigation
  );
  const {permissions} = useSelector((state) => state.permissions);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [subNav, setSubNav] = useState([]);

  const allowedNavigationData = sidebarNavigation.filter((item) => {
    return permissions.includes(item.name);
  });

  useEffect(() => {
    const currentNavItem = allowedNavigationData.find((item) =>
      pathname.includes(item.path)
    );
    const currentSubNav = currentNavItem?.sub?.filter((subItem) =>
      permissions.includes(subItem.name)
    );
    setSubNav(currentSubNav);
  }, []);

  const handleAccordionExpand = (data) => {
    navigate(data?.path);
    const permittedSubNav = data?.sub?.filter((subItem) =>
      permissions.includes(subItem.name)
    );
    setSubNav(permittedSubNav);
  };

  return (
    <>
      <Stack mt={2} maxHeight="48%" sx={{ overflowY: "auto" }} height="700px">
        <List>
          {allowedNavigationData?.map((item, i) => (
            <ListItem
              key={i}
              disablePadding
              sx={{ textTransform: "uppercase" }}
            >
              <Accordion
                expanded={pathname.includes(item.path)}
                sx={{ width: "100%", background: "none", color: "none " }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ height: "5px" }}
                  onClick={() => handleAccordionExpand(item)}
                >
                  <ListItemButton
                    sx={{
                      px: 1,
                      gap: 1,
                      height: "40px",
                      ":hover": {
                        color: "none",
                        background: "none",
                      },
                      ":active": {
                        color: "none",
                        background: "none",
                      },
                      ":focus": {
                        color: "none",
                        background: "none",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        // mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {getIconElement(item.icon)}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      sx={{ fontSize: "10px" }}
                    />
                  </ListItemButton>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    width: "auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "2px",
                  }}
                >
                  {subNav?.map((item2, i) => (
                    <Link
                      to={item2.path}
                      onClick={() => dispatch(toggleDrawer("isSidebar"))}
                      style={{ textDecoration: "none" }}
                      key={i}
                    >
                      <Box px={5} display="flex" justifyContent="space-between">
                        <Button
                          sx={{
                            color: theme.palette.common.white,
                            fontSize: "12px",
                            ":hover": {
                              color: theme.palette.common.white,
                              background: theme.palette.primary.main,
                            },
                          }}
                        >
                          {item2.name}
                        </Button>
                        <Radio
                          checked={pathname.includes(item2.path)}
                          sx={{
                            "& .MuiSvgIcon-root": {
                              marginBottom: "2.5px",
                              fontSize: "12px",
                            },
                          }}
                        />
                      </Box>
                    </Link>
                  ))}
                </AccordionDetails>
              </Accordion>
            </ListItem>
          ))}
        </List>
      </Stack>
    </>
  );
};

export const NavigationMain = () => {
  const dispatch = useDispatch()
  const { isSidebar } = useSelector((state) => state.disclosure.drawers);
  const adjustHeightonDesktop = useMediaQuery("(min-height:930px)");
  const theme = useTheme();

  return (
    <>
      <Drawer
        open={isSidebar}
        onClose={() => dispatch(toggleDrawer("isSidebar"))}
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
            <NavigationHeader />
            <NavigationContent />
          </Stack>
          <NavigationFooter />
        </Box>
      </Drawer>
    </>
  );
};
