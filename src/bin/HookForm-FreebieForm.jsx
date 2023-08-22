import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Stack,
  Typography,
  Modal,
  Divider,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../../../services/store/disclosureSlice";
import { useDefaultStyles } from "../../../../hooks/useDefaultStyles";
import { useGetItemsQuery } from "../../../../services/api";
import { CameraAlt, Clear, Print } from "@mui/icons-material";
import { ModalToast } from "../../../../components/SweetAlert-Components";
import { SignatureField } from "../../../../components/Fields";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = yup.object().shape({
  signature: yup.mixed().required("Signature is required"),
  photoProof: yup.mixed().required("Photo proof is required"),
});

export const FreebieViewing = () => {
  const dispatch = useDispatch();
  const { defaultButtonStyle } = useDefaultStyles();
  const { isFreebieViewing } = useSelector((state) => state.disclosure.modals);
  const { data: itemData } = useGetItemsQuery();
  const { selectedRowData } = useSelector((state) => state.selectedRowData);
  const defaultFreebieValues = selectedRowData?.freebies?.map((item) => {
    const selectedItem = itemData?.data?.items?.find(
      (option) => option?.itemCode === item?.itemCode
    );

    return {
      items: selectedItem || null,
      quantity: item?.quantity || "",
    };
  });
  const clientDetails = {
    clientId: selectedRowData?.clientId
      ? selectedRowData?.clientId
      : selectedRowData?.id,
    freebieRequestId: selectedRowData?.freebieRequestId,
    ownersName: selectedRowData?.ownersName,
    ownersAddress: selectedRowData?.ownersAddress,
    phoneNumber: selectedRowData?.phoneNumber,
    transactionNumber: selectedRowData?.transactionNumber,
    freebies: defaultFreebieValues || [],
  };

  const [isCameraActive, setIsCameraActive] = useState(false);
  const toggleCamera = () => {
    setIsCameraActive(!isCameraActive);
  };

  const handleCloseViewing = () => {
    dispatch(toggleModal("isFreebieViewing"));
  };

  const { control, handleSubmit, watch, setValue } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      signature: "",
      photoProof: null,
    },
  });

  const submitHandler = async (data) => {
    ModalToast().then((res) => {
      if (res.isConfirmed) {
        try {
          console.log("Signature:", data.signature);
          console.log("Photo Proof:", data.photoProof);

          // Do whatever you need to do with the data
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <Modal
      open={isFreebieViewing}
      onClose={() => {}}
      sx={{
        "& .MuiDrawer-paper": {
          width: 965,
          background: "none",
          bgcolor: "white",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
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
            width: "90%",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
            px: 2,
          }}
        >
          <></>
          <form onSubmit={handleSubmit(submitHandler)}>
            {/* Other components ... */}

            {/* Signature Field */}
            <Stack
              justifyContent="space-between"
              flexDirection="row"
              width="85%"
              mb={1}
            >
              <Box width="25%">
                <Typography textAlign="center" fontSize="12.5px" mt={1}>
                  Name
                </Typography>
                <Divider
                  sx={{
                    color: "black",
                    bgcolor: "black",
                  }}
                />
                <Typography textAlign="center" fontSize="12.5px">
                  Prepared By
                </Typography>
                <Typography textAlign="center" fontSize="12.5px" mt={1}>
                  Name
                </Typography>
                <Divider
                  sx={{
                    color: "black",
                    bgcolor: "black",
                  }}
                />
                <Typography textAlign="center" fontSize="12.5px">
                  Approved By
                </Typography>
              </Box>

              <Box width="30%" mt={1}>
                <Box display="flex" flexDirection="row">
                  <SignatureField name="signature" control={control} />
                  {watch("signature") && (
                    <IconButton onClick={() => setValue("signature", "")}>
                      <Clear />
                    </IconButton>
                  )}
                </Box>
                <Divider
                  sx={{
                    color: "black",
                    bgcolor: "black",
                  }}
                />
                <Typography textAlign="center" fontSize="12.5px">
                  Received By (E-signature)
                </Typography>
              </Box>
            </Stack>
            {/* Signatures Start End  */}

            {/* Webcam / PhotoProof Field */}
            <Stack width="100%">
              {/* {isCameraActive ? (
                <div>
                  ''
                  <WebcamField
                    audio={false}
                    name="photoProof"
                    control={control}
                    screenshotFormat="image/png"
                    width={240}
                    height={180}
                  />
                  <IconButton
                    onClick={() => {
                      setValue(
                        "photoProof",
                        "Must provide captured photo to photoProof"
                      );
                    }}
                  >
                    <CameraAlt fontSize="50px" />
                  </IconButton>
                  <IconButton onClick={toggleCamera}>
                    <Close />
                  </IconButton>
                </div>
              ) : ( */}
              <>
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Typography fontSize="13.5px">Proof of Delivery</Typography>
                  {watch("photoProof") ? (
                    <>
                      <IconButton onClick={() => setValue("photoProof", "")}>
                        <Clear />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setValue("photoProof", file);
                          }
                        }}
                      />
                      <IconButton onClick={toggleCamera}>
                        <CameraAlt />
                      </IconButton>
                    </>
                  )}
                </Box>
                {watch("photoProof") && (
                  <div>
                    <Typography fontSize="10.5px" color="green">
                      {`${watch("photoProof")?.name || "Photo"}`} uploaded
                      successfully
                    </Typography>
                  </div>
                )}
              </>
              {/* )} */}
            </Stack>
            {/* Webcam / PhotoProof End */}

            {!isCameraActive && (
              <ButtonGroup
                sx={{
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  mr: 2,
                  gap: 1,
                  justifyContent: "end",
                  width: "100%",
                  display: "flex",
                  ...defaultButtonStyle,
                }}
              >
                <Button className="cancelButtons" onClick={handleCloseViewing}>
                  Close
                </Button>
                <Button
                  startIcon={<Print />}
                  className="primaryButtons"
                  type="submit"
                >
                  Proceed
                </Button>
              </ButtonGroup>
            )}
          </form>
        </Stack>
      </Box>
    </Modal>
  );
};