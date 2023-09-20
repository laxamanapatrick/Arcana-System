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
import { toggleModal } from "../../../services/store/disclosureSlice";
import { useDefaultStyles } from "../../../hooks/useDefaultStyles";
import { DirectCustomerDetails } from "./form-components-direct/Direct-Customer-Details";
import { DirectTermsAndConditions } from "./form-components-direct/Direct-Terms-And-Conditions";
import { DirectAttachments } from "./form-components-direct/Direct-Attachments";
import {
  InteractiveToast,
  ModalToast,
} from "../../../components/SweetAlert-Components";
import {
  setDirectClientDetails,
  setDirectFreebieRequest,
  setDirectTermsAndConditions,
} from "../../../services/store/directRegistrationSlice";

export const DirectForm = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { defaultButtonStyle } = useDefaultStyles();
  const { isDirectForm } = useSelector((state) => state.disclosure.modals);
  const adjustWidth = useMediaQuery("(max-width:1030px)");

  const {
    directFreebieRequest,
    directClientDetails,
    directTermsAndConditions,
  } = useSelector((state) => state.directRegistrationData);
  const [attachments, setAttachments] = useState();

  const fields = {
    customer_details: {
      businessName: directClientDetails?.businessName || "",
      ownersName: directClientDetails?.ownersName || "",
      ownersAddress: directClientDetails?.ownersAddress || "",
      businessAddress: directClientDetails?.businessAddress || "",
      representativeName: directClientDetails?.representativeName || "",
      representativePosition: "NA",
      cluster: directClientDetails?.cluster || "",
    },
    terms_and_conditions: {
      freezer: directTermsAndConditions?.freezer || "",
      typeOfCustomer: directTermsAndConditions?.typeOfCustomer || "",
      directDelivery: directTermsAndConditions?.directDelivery || "",
      bookingCoverage: directTermsAndConditions?.bookingCoverage || "",
      terms: directTermsAndConditions?.terms || "",
      modeOfPayment: directTermsAndConditions?.modeOfPayment || "",
      discountTypes: directTermsAndConditions?.discountTypes || "",
      creditLimit:
        directTermsAndConditions?.terms === "creditlimit"
          ? directTermsAndConditions?.creditLimit
          : "NA",
      termDays:
        directTermsAndConditions?.terms === "1up1down" ||
        directTermsAndConditions?.terms === "creditlimit"
          ? directTermsAndConditions?.termDays
          : "NA",
      fixedValue:
        directTermsAndConditions?.discountTypes === "fixed"
          ? directTermsAndConditions?.fixedValue
          : "NA",
    },
    attachments: attachments,
    freebies: directFreebieRequest?.freebies || [],
  };

  const [viewing, setViewing] = useState(1);
  const [canNext, setCanNext] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const components = {
    1: (
      <DirectCustomerDetails
        // selectedRowData={selectedRowData}
        fields={fields}
        setCanNext={setCanNext}
      />
    ),
    2: <DirectTermsAndConditions fields={fields} setCanNext={setCanNext} />,
    3: (
      <DirectAttachments
        setAttachments={setAttachments}
        setCanSubmit={setCanSubmit}
      />
    ),
  };

  const handlePageChange = (action) => {
    console.log(action, viewing);
    if (Number(viewing) === 3 && action === "previous") {
      ModalToast(
        "Attached Files will be removed.",
        "Are you sure you want to go back?",
        "",
        "",
        "",
        "",
        "No"
      ).then((res) => {
        if (res.isConfirmed) {
          setViewing((prev) => prev - 1);
        } else {
          return;
        }
      });
    }
    if (action === "previous") {
      setViewing((prev) => prev - 1);
    }
    if (action === "next" && canNext) {
      setViewing((prev) => prev + 1);
    }
    if (!canNext) {
      InteractiveToast(
        "Required Fields",
        "Please accomplish all required fields first",
        "info"
      );
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
    if (viewing > 3) {
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
        dispatch(setDirectClientDetails(null));
        dispatch(setDirectTermsAndConditions(null));
        dispatch(setDirectFreebieRequest(null));
        setViewing(1);
        dispatch(toggleModal("isDirectForm"));
      }
    });
  };

  const handleSubmit = () => {
    if (viewing === 3 && canSubmit) {
      alert("Submitted");
    }
    if (!canSubmit) {
      alert("required attachments not met");
    }
  };

  console.log(fields);

  return (
    <Modal
      open={isDirectForm}
      onClose={() => {}}
      sx={{
        zIndex: "300 !important",
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
              {`Direct Customer Registration (${
                viewing === 1
                  ? "Direct Customer Details"
                  : viewing === 2
                  ? "Direct Terms and Conditions"
                  : viewing === 3
                  ? "Direct Attachments"
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
          <Stack height="100%" width="100%">
            {components[viewing]}
          </Stack>

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
