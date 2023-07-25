import React from "react";
import { Button, Divider, Paper, Stack, Typography, useTheme } from "@mui/material";
import { useDefaultStyles } from "../../../hooks/useDefaultStyles";
import SearchField from "../../../components/SearchField";

export const UserAccount = () => {
  const theme = useTheme();
  const { defaultButtonStyle, defaultTextFieldStyle } = useDefaultStyles();
  const subNavigationHeight = 8;

  const paperHeaderStyle = {
    height: `${subNavigationHeight}%`,
    maxHeight: `${subNavigationHeight}%`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: 'none',
    // background: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    px: 2,
    mx: 1,
    mt: 1,
  };

  const paperContentStyle = {
    color: theme.palette.secondary.main,
    background: 'none',
    // background: theme.palette.primary.main,
    p: 2,
    m: 1,
    height: "95%",
    maxHeight: "95%",
  };

  return (
    <>
      <Stack height="100%" maxHeight="100%" width="100%">
        <Paper elevation={1} sx={paperHeaderStyle}>
          <Stack>
          <Typography
            sx={{ fontWeight: 'bold', color: theme.palette.secondary.main}}
          >
            User Accounts
          </Typography>
          <Divider sx={{height: '1.5px', color: theme.palette.secondary.main, bgcolor: theme.palette.secondary.main}} />
          </Stack>
          <Stack
            width="auto"
            flexDirection="row"
            sx={{ ...defaultButtonStyle }}
          >
            <Button
              sx={{ marginRight: 1 }}
              size="small"
              className={`addRowButtons`}
            >
              Add
            </Button>
            <SearchField />
          </Stack>
        </Paper>
        <Paper elevation={20} sx={paperContentStyle}>
          Content
        </Paper>
      </Stack>
    </>
  );
};
