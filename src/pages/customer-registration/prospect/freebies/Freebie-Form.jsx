import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Drawer,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedRow } from "../../../../services/store/selectedRowSlice";
import { toggleDrawer } from "../../../../services/store/disclosureSlice";
import { ProductionQuantityLimits } from "@mui/icons-material";
import { useDefaultStyles } from "../../../../hooks/useDefaultStyles";

export const FreebieForm = ({ row }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { isFreebieForm } = useSelector((state) => state.disclosure.drawers);
  const { defaultButtonStyle } = useDefaultStyles();
  return (
    <Stack width="auto" display="flex" alignItems="start">
      {/* <IconButton
        onClick={() => {
          dispatch(setSelectedRow(row));
          dispatch(toggleDrawer("isFreebieForm"));
        }}
        sx={{ marginRight: 1, px: 1 }}
        size="small"
      >
        <ProductionQuantityLimits />
      </IconButton> */}
      <Drawer
        open={isFreebieForm}
        onClose={() => {}}
        sx={{
          "& .MuiDrawer-paper": {
            width: 300,
            height: "100%",
            background: "none",
            bgcolor: "white",
            ...defaultButtonStyle,
          },
        }}
        anchor="right"
      >
        <form
          style={{ height: "100%" }}
          // onSubmit={handleSubmit(submitAddOrEditHandler)}
        >
          <Stack sx={{ height: "100%" }}>
            <Box
              sx={{
                height: "6%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: theme.palette.primary.main,
                fontWeight: "bold",
              }}
            >
              {`Edit Prospect Request`}
            </Box>
            <Divider
              sx={{
                height: "1.5px",
                color: theme.palette.secondary.main,
                bgcolor: theme.palette.secondary.main,
              }}
            />
            <Box
              sx={{
                height: "100%",
                p: 2,
                display: "flex",
                justifyContent: "start",
                flexDirection: "column",
                gap: 3,
              }}
            >
              Freebies
            </Box>

            <Divider
              sx={{
                height: "1.5px",
                color: theme.palette.secondary.main,
                bgcolor: theme.palette.secondary.main,
              }}
            />
            <ButtonGroup sx={{ gap: 1, m: 1, justifyContent: "end" }}>
              <Button className="primaryButtons" type="submit" tabIndex={0}>
                Add
              </Button>
              <Button
                className="cancelButtons"
                onClick={() => dispatch(toggleDrawer("isFreebieForm"))}
                tabIndex={0}
              >
                Close
              </Button>
            </ButtonGroup>
          </Stack>
        </form>
      </Drawer>
    </Stack>
  );
};
