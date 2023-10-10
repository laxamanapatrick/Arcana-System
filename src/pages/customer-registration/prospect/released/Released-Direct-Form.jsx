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
import { Attachments } from "./form-components/Attachments";
import { TermsAndConditions } from "./form-components/Terms-And-Conditions";
import {
  InteractiveToast,
  ModalToast,
} from "../../../../components/SweetAlert-Components";
import {
  setClientDetails,
  setTermsAndConditions,
} from "../../../../services/store/customerDetailsSlice";
import {
  useCreateAddAttachmentsMutation,
  useCreateAddTermsAndConditionsMutation,
  useCreateRegisterClientMutation,
} from "../../../../services/api";

export const ReleasedToDirectForm = () => {
  const theme = useTheme();
  const { defaultButtonStyle } = useDefaultStyles();
  const dispatch = useDispatch();
  const adjustWidth = useMediaQuery("(max-width:1030px)");
  const { selectedRowData } = useSelector((state) => state.selectedRowData);
  const { isReleasedToDirectForm } = useSelector(
    (state) => state.disclosure.modals
  );
  const { clientDetails, termsAndConditions } = useSelector(
    (state) => state.releasedToRegistrationData
  );

  const [attachments, setAttachments] = useState();
  const [pinLocation, setPinLocation] = useState({
    latitude: "",
    longitude: "",
  });

  const fields = {
    clientId: selectedRowData?.id,
    customer_details: {
      businessAddress: clientDetails?.businessAddress || "",
      representativeName: clientDetails?.representativeName || "",
      representativePosition: "NA",
      cluster: clientDetails?.cluster || "",
    },
    terms_and_conditions: {
      freezer: termsAndConditions?.freezer || "",
      typeOfCustomer: termsAndConditions?.typeOfCustomer || "",
      directDelivery: termsAndConditions?.directDelivery || "",
      bookingCoverageId: termsAndConditions?.bookingCoverageId || "",
      terms: Number(termsAndConditions?.terms) || "",
      modeOfPayment: Number(termsAndConditions?.modeOfPayment) || "",
      discountTypes: termsAndConditions?.discountTypes || "",
      creditLimit:
        Number(termsAndConditions?.terms) === 3
          ? termsAndConditions?.creditLimit
          : "NA",
      termDays:
        termsAndConditions?.terms === 2 || termsAndConditions?.terms === 3
          ? termsAndConditions?.termDays
          : "NA",
      fixedValue:
        termsAndConditions?.discountTypes === "fixed"
          ? termsAndConditions?.fixedValue
          : "NA",
    },
    attachments: attachments,
  };

  const [viewing, setViewing] = useState(1);
  const [canNext, setCanNext] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const components = {
    1: (
      <CustomerDetails
        selectedRowData={selectedRowData}
        fields={fields}
        setCanNext={setCanNext}
        pinLocation={pinLocation}
        setPinLocation={setPinLocation}
      />
    ),
    2: <TermsAndConditions fields={fields} setCanNext={setCanNext} />,
    3: (
      <Attachments
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
        dispatch(setClientDetails(null));
        dispatch(setTermsAndConditions(null));
        setPinLocation({
          latitude: "",
          longitude: "",
        });
        setViewing(1);
        dispatch(toggleModal("isReleasedToDirectForm"));
      }
    });
  };

  const [createRegisterClient] = useCreateRegisterClientMutation();
  const [createAddTermsAndConditions] =
    useCreateAddTermsAndConditionsMutation();
  const [createAddAttachments] = useCreateAddAttachmentsMutation();
  const handleSubmit = async () => {
    //First Payload Start
    const firstPayload = {
      clientId: fields?.clientId,
      businessAddress: fields?.customer_details?.businessAddress,
      authorizedRepresentative: fields?.customer_details?.representativeName,
      authorizedRepresentativePosition:
        fields?.customer_details?.representativePosition,
      cluster: fields?.customer_details?.cluster,
      longitude: pinLocation?.longitude?.toString(),
      latitude: pinLocation?.latitude?.toString(),
    };
    //First Payload End

    //Second Payload Manpulation Start
    let secondPayload;

    const secondPayloadAll = {
      clientId: fields?.clientId,
      freezer: fields?.terms_and_conditions?.freezer === "yes" ? true : false,
      typeOfCustomer: fields?.terms_and_conditions?.typeOfCustomer,
      directDelivery:
        fields?.terms_and_conditions?.directDelivery === "yes" ? true : false,
      bookingCoverageId: Number(
        fields?.terms_and_conditions?.bookingCoverageId
      ),
      modeOfPayment: Number(fields?.terms_and_conditions?.modeOfPayment),
      terms: Number(fields?.terms_and_conditions?.terms),
      creditLimit:
        Number(fields?.terms_and_conditions?.terms) === 3
          ? fields?.terms_and_conditions?.creditLimit
          : null,
      termDaysId:
        termsAndConditions?.terms === 2 || termsAndConditions?.terms === 3
          ? fields?.terms_and_conditions?.termDays?.id
          : null,
      fixedDiscounts: {
        discountPercentage:
          fields?.terms_and_conditions?.discountTypes === "fixed"
            ? fields?.terms_and_conditions?.fixedValue
            : 0,
      },
      variableDiscount:
        fields?.terms_and_conditions?.discountTypes === "variable"
          ? true
          : false,
    };

    if (Number(fields?.terms_and_conditions?.terms) === 1) {
      secondPayload = {
        ...secondPayloadAll,
      };
      delete secondPayload.creditLimit;
      delete secondPayload.termDaysId;
    } else if (
      Number(fields?.terms_and_conditions?.terms) === 3 &&
      (Number(termsAndConditions?.terms) === 2 ||
        Number(termsAndConditions?.terms) === 3)
    ) {
      secondPayload = secondPayloadAll;
    } else {
      secondPayload = {
        ...secondPayloadAll,
      };
      delete secondPayload.creditLimit;
    }
    //Second Payload Manpulation End

    //Third Payload Start
    const thirdPayload = Object.values(fields?.attachments);
    //Third Payload End

    if (viewing === 3 && canSubmit) {
      console.log(firstPayload);
      console.log(secondPayload);
      console.log(thirdPayload);
      try {
        await createRegisterClient({
          id: fields?.clientId,
          payload: firstPayload,
        }).unwrap();
        await createAddTermsAndConditions({
          id: fields?.clientId,
          payload: secondPayload,
        }).unwrap();
        await createAddAttachments({
          id: fields?.clientId,
          payload: thirdPayload,
        }).unwrap();
      } catch (error) {
        console.log(error);
      }
    }
    if (!canSubmit) {
      alert("Required attachments not provided");
    }
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
