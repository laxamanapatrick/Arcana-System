import React, { useState } from "react";
import { useDefaultStyles } from "../../../hooks/useDefaultStyles";
import {
  Badge,
  Divider,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { DirectRegistration } from "./Direct-Registration";
import { RegistrationStatus } from "./Registration-Status";
import { useGetDirectRegistrationClientsQuery } from "../../../services/api";

export const Direct = () => {
  const theme = useTheme();
  const { defaultPaperHeaderStyle, defaultPaperContentStyle } =
    useDefaultStyles();
  const [viewing, setViewing] = useState(0);

  const { data: registeredClientsData } = useGetDirectRegistrationClientsQuery({
    Status: true,
  });

  const totalRequestedDirect = registeredClientsData?.data?.totalCount

  const directNavbar = [
    {
      case: 1,
      name: "Direct Register",
      badge: totalRequestedDirect || 0,
    },
    // {
    //   case: 2,
    //   name: "Direct Status",
    //   badge: 2,
    // },
  ];

  const components = {
    1: <DirectRegistration />,
    // 2: <RegistrationStatus />,
  };

  return (
    <>
      <Paper
        elevation={1}
        sx={{
          ...defaultPaperHeaderStyle,
          justifyContent: "space-evenly",
        }}
      >
        {directNavbar?.map((item, i) => (
          <Stack
            sx={{ cursor: "pointer", alignItems: "center", width: "160px" }}
            key={i}
            onClick={() => setViewing(Number(item.case))}
          >
            <Badge
              badgeContent={item.badge}
              color="primary"
              invisible={item.case === viewing}
            >
              <Typography
                sx={{
                  fontSize: "14.5px",
                  fontWeight: "bold",
                  color: theme.palette.secondary.main,
                  textAlign: "center",
                }}
              >
                {item.name}
              </Typography>
            </Badge>
            {item.case === viewing && (
              <Divider
                sx={{
                  background: theme.palette.secondary.main,
                  width: "160px",
                  height: "1.5px",
                  transition: "width 0.8s ease-in-out",
                }}
              />
            )}
          </Stack>
        ))}
      </Paper>
      <Paper
        elevation={20}
        sx={{ ...defaultPaperContentStyle, maxHeight: "85%" }}
      >
        {components[viewing] || ""}
      </Paper>
    </>
  );
};
