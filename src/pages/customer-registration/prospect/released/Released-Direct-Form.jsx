import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Modal,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../../../services/store/disclosureSlice";
import { useDefaultStyles } from "../../../../hooks/useDefaultStyles";
import { CustomerDetails } from "./form-components/Customer-Details";
import { Attachements } from "./form-components/Attachements";
import { TermsAndConditions } from "./form-components/Terms-And-Conditions";
import { ModalToast } from "../../../../components/SweetAlert-Components";

export const ReleasedToDirectForm = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const adjustWidth = useMediaQuery("(max-width:1030px)");
  const { isReleasedToDirectForm } = useSelector(
    (state) => state.disclosure.modals
  );
  const { defaultButtonStyle } = useDefaultStyles();

  const [clientId, setClientId] = useState("");

  const [viewing, setViewing] = useState(1);

  const components = {
    1: <CustomerDetails />,
    2: <TermsAndConditions />,
    3: <Attachements />,
  };

  const handlePageChange = (action) => {
    if (action === "previous") {
      setViewing((prev) => prev - 1);
    }

    if (action === "next") {
      setViewing((prev) => prev + 1);
    }
  };

  const disablePrevious = () => {
    let value;
    if (viewing <= 1) {
      value = true;
    } else {
      value = false;
    }
    return value;
  };

  const disableNext = () => {
    let value;
    if (viewing >= 3) {
      value = true;
    } else {
      value = false;
    }
    return value;
  };

  const handleCancel = () => {
    ModalToast(
      "Information will not be saved.",
      "Are you sure you want to cancel registration?",
      "",
      "",
      "",
      "",
      "No"
    ).then((res) => {
      if (res.isConfirmed) {
        dispatch(toggleModal("isReleasedToDirectForm"));
      }
    });
  };

  const handleSubmit = () => {
    alert("submit details");
  };

  return (
    <Modal
      open={isReleasedToDirectForm}
      onClose={() => {}}
      sx={{
        "& .MuiDrawer-paper": {
          background: "none",
          bgcolor: "white",
          position: "fixed",
          top: 0,
          left: 0,
        },
      }}
      anchor="right"
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0, 0, 0, 0.75)",
        }}
      >
        <Stack
          sx={{
            gap: 1,
            py: 2,
            height: "90%",
            width: adjustWidth ? "90%" : "50%",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
            px: 2,
          }}
        >
          {/* Header  */}
          <Stack width="100%" gap={1}>
            <Typography textAlign="center" fontSize="14px" fontWeight="bold">
              {`Customer Registration (${
                viewing === 1
                  ? "Customer Details"
                  : viewing === 2
                  ? "Terms and Conditions"
                  : viewing === 3
                  ? "Attachments"
                  : ""
              })`}
            </Typography>
            <Divider
              sx={{
                width: "100%",
                height: "1px",
                color: theme.palette.secondary.main,
                bgcolor: theme.palette.secondary.main,
              }}
            />
          </Stack>

          {/* Forms */}
          <Stack>{components[viewing]}</Stack>

          {/* Footer */}
          <ButtonGroup
            sx={{
              position: "sticky",
              zIndex: 1,
              mb: -1,
              gap: 1,
              justifyContent: "end",
              width: "100%",
              display: "flex",
              border: "1px solid black",
              borderStyle: "dotted",
              p: 1,
              ...defaultButtonStyle,
            }}
          >
            <Button className="cancelButtons" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              className="previousButtons"
              disabled={disablePrevious()}
              onClick={() => handlePageChange("previous")}
            >
              Previous
            </Button>
            <Button
              className="primaryButtons"
              disabled={disableNext()}
              onClick={
                viewing === 3 ? handleSubmit : () => handlePageChange("next")
              }
            >
              {viewing === 3 ? "Submit" : "Next"}
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
    </Modal>
  );
};
