import { useState } from "react";
import {
  Badge,
  Divider,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useDefaultStyles } from "../../../hooks/useDefaultStyles";
import { RequestProspect } from "./Request-Prospect";
import { ProspectStatus } from "./Prospect-Status";
import { Released } from "./released/Released";
import { FreebieStatus } from "./freebies/Freebie-Status";
import { RequestFreebies } from "./freebies/Request-Freebies";
import {
  useGetApprovedProspectQuery,
  useGetRequestedProspectQuery,
} from "../../../services/api";

export const Prospect = () => {
  const theme = useTheme();
  const { defaultPaperHeaderStyle, defaultPaperContentStyle } =
    useDefaultStyles();
  const [viewing, setViewing] = useState(0);

  const { data: requested } = useGetRequestedProspectQuery({ IsActive: true });
  const { data: approved } = useGetApprovedProspectQuery({ status: true });

  const totalRequest = requested?.data?.totalCount || 0;
  const totalApproved = approved?.data?.totalCount || 0;

  const prospectNavbar = [
    {
      case: 1,
      name: "Request Prospect",
      badge: totalRequest || 0,
    },
    {
      case: 2,
      name: "Prospect Status",
      badge: totalApproved || 0,
    },
    {
      case: 3,
      name: "Request Freebies",
    },
    {
      case: 4,
      name: "Freebie Status",
    },
    {
      case: 5,
      name: "Released",
    },
  ];

  const components = {
    1: <RequestProspect />,
    2: <ProspectStatus />,
    3: <RequestFreebies />,
    4: <FreebieStatus />,
    5: <Released />,
  };

  return (
    <>
      <Paper
        elevation={1}
        sx={{
          ...defaultPaperHeaderStyle,
          // justifyContent: "start",
          //to remove ^ when freebie is coded
        }}
      >
        {prospectNavbar?.map((item, i) => (
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
