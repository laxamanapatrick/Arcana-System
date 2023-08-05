import { useState } from "react";
import { Divider, Paper, Stack, Typography, useTheme } from "@mui/material";
import { useDefaultStyles } from "../../../hooks/useDefaultStyles";
import { RequestProspect } from "./Request-Prospect";
import { ProspectStatus } from "./Prospect-Status";
import { Released } from "./released/Released";
import { FreebieStatus } from "./freebies/Freebie-Status";
import { RequestFreebies } from "./freebies/Request-Freebies";
import { prospectNavbar } from "../../../routes/navigationData";

export const Prospect = () => {
  const theme = useTheme();
  const { defaultPaperHeaderStyle, defaultPaperContentStyle } =
    useDefaultStyles();
  const [viewing, setViewing] = useState(1);

  const components = {
    1: <RequestProspect />,
    2: <ProspectStatus />,
    // 3: <RequestFreebies />,
    // 4: <FreebieStatus />,
    // 5: <Released />,
  };

  return (
    <>
      <Paper
        elevation={1}
        sx={{
          ...defaultPaperHeaderStyle,
          justifyContent: "start",
          //to remove ^ when freebie is coded 
        }}
      >
        {prospectNavbar?.map((item, i) => (
          <Stack
            sx={{ cursor: "pointer", alignItems: "center", width: "160px" }}
            key={i}
            onClick={() => setViewing(Number(item.case))}
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
        {components[viewing]}
      </Paper>
    </>
  );
};
