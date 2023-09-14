import React, { useCallback, useRef, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../../../services/store/disclosureSlice";
import { useDefaultStyles } from "../../../../hooks/useDefaultStyles";
import {
  jsonServerApi,
  useCreateUpdateReleaseProspectMutation,
  useGetItemsQuery,
} from "../../../../services/api";
import {
  AttachFile,
  CameraAlt,
  Check,
  Clear,
  Close,
  Draw,
  Print,
} from "@mui/icons-material";
// import { useReactToPrint } from "react-to-print";
// import ReactSignatureCanvas from "react-signature-canvas";
import { useDropzone } from "react-dropzone";
import Webcam from "react-webcam";
import {
  BasicToast,
  ModalToast,
} from "../../../../components/SweetAlert-Components";
import { SubmittingData } from "../../../../components/Lottie-Components";
import SignatureCanvas from "../../../../components/Signature-Canvas";

export const FreebieReleasing = () => {
  const dispatch = useDispatch();
  const printRef = useRef();
  const { defaultButtonStyle } = useDefaultStyles();
  const { isFreebieReleasing } = useSelector(
    (state) => state.disclosure.modals
  );
  const { data: itemData } = useGetItemsQuery();
  const { fullname } = useSelector((state) => state.fullname);
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

  // const signCanvasRef = useRef(null);
  const [signatureValue, setSignatureValue] = useState({
    value: "",
    isSigned: false,
  });

  // const printContent = useReactToPrint({
  //   content: () => printRef?.current,
  // });

  const [proofOfDeliveryFiles, setProofOfDeliveryFiles] = useState();
  const [isInvalidFile, setIsInvalidFile] = useState(false);
  const [isValidProofOfDelivery, setIsValidProofOfDelivery] = useState(false);

  const webcamRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  const toggleCamera = () => {
    setIsCameraActive(!isCameraActive);
  };

  const onDropProofOfDelivery = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setIsInvalidFile(true);
      setIsValidProofOfDelivery(false);
    } else {
      setIsInvalidFile(false);
      setProofOfDeliveryFiles(acceptedFiles[0]);
      setIsValidProofOfDelivery(true);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDropProofOfDelivery,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    }, // Only accept image files
    multiple: false, // Allow only a single file to be uploaded
  });

  const handleRemoveProofOfDelivery = () => {
    setProofOfDeliveryFiles(null);
    setIsValidProofOfDelivery(false);
  };

  const handleCapturePhoto = () => {
    const capturedImage = webcamRef.current.getScreenshot();
    setCapturedPhoto(capturedImage);
    setProofOfDeliveryFiles(capturedImage);
    setIsCameraActive(false);
    setIsValidProofOfDelivery(true);
  };

  const handleCloseViewing = () => {
    setProofOfDeliveryFiles(null);
    setIsValidProofOfDelivery(false);
    setSignatureValue({
      value: "",
      isSigned: false,
    });
    dispatch(toggleModal("isFreebieReleasing"));
  };

  const [createUpdateReleaseProspect, { isLoading }] =
    useCreateUpdateReleaseProspectMutation();
  const handleReleasing = () => {
    if (!signatureValue.isSigned) {
      BasicToast("warning", "Please provide a signature");
      return;
    }
    if (!isValidProofOfDelivery && !capturedPhoto) {
      BasicToast("warning", "Please provide a proof of delivery photo");
      return;
    } else {
      //Conversions to File Type

      const imageType = "image/jpeg";
      const base64ToBlob = (base64) => {
        const binaryString = atob(base64.split(",")[1]);
        const arrayBuffer = new ArrayBuffer(binaryString.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryString.length; i++) {
          uint8Array[i] = binaryString.charCodeAt(i);
        }
        return new Blob([arrayBuffer], { type: "image/jpeg" });
      };

      const signatureBlob = base64ToBlob(signatureValue?.value);
      const renamedSignatureImage = new File(
        [signatureBlob],
        `signature_${Date.now()}.jpg`,
        { type: imageType }
      );

      const renamedProofOfDeliveryFile = new File(
        [proofOfDeliveryFiles],
        `proof_of_delivery_${Date.now()}.jpg`,
        { type: imageType }
      );
      const formData = new FormData();
      formData.append("ESignature", renamedSignatureImage);
      formData.append("PhotoProof", renamedProofOfDeliveryFile);

      //Submit after convertions

      ModalToast().then(async (res) => {
        if (res.isConfirmed) {
          try {
            await createUpdateReleaseProspect({
              id: clientDetails?.clientId,
              payload: formData,
            }).unwrap();
            // printContent();
            BasicToast("success", "");
            setProofOfDeliveryFiles(null);
            setCapturedPhoto(null);
            setIsValidProofOfDelivery(false);
            setSignatureValue({
              value: "",
              isSigned: false,
            });
            dispatch(jsonServerApi.util.invalidateTags(["Approved Freebies"]));
            dispatch(jsonServerApi.util.invalidateTags(["Released Prospect"]));
            dispatch(toggleModal("isFreebieReleasing"));
          } catch (error) {
            console.log(error);
            BasicToast("error", "");
            return;
          }
        } else {
          return;
        }
      });
    }
  };

  return (
    <Modal
      open={isFreebieReleasing}
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
        {isLoading && <SubmittingData text={"Releasing Freebie"} />}
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

          {/* Print Start  */}
          <Stack
            ref={printRef}
            sx={{
              gap: 1,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid black",
              borderStyle: "dashed",
            }}
          >
            <Typography fontWeight="bold" fontSize="12.5px" mt={1}>
              Freebie Form
            </Typography>

            {/* Client Details  */}

            <Stack
              justifyContent="space-between"
              flexDirection="row"
              width="85%"
            >
              <Box>
                <Typography fontSize="11.5px">
                  Owner's Name: {clientDetails.ownersName}
                </Typography>
                {/* <Typography fontSize="11.5px">
                  Phone Number: {clientDetails.phoneNumber}
                </Typography> */}
                <Typography fontSize="11.5px">
                  Owner's Address: {clientDetails.ownersAddress}
                </Typography>
              </Box>

              <Box>
                <Typography fontSize="11.5px">
                  Transaction #: {clientDetails.transactionNumber}
                </Typography>
                {/* <Typography fontSize="11.5px">
                  Store Type: To be added on get
                </Typography> */}
                {/* <Typography fontSize="11.5px">
                  Freebie Form #: {clientDetails.freebieRequestId}
                </Typography>
                <Typography fontSize="11.5px">
                  Client #: {clientDetails.clientId}
                </Typography> */}
              </Box>
            </Stack>

            {/* Client Details End */}

            <TableContainer
              component={Paper}
              sx={{ maxHeight: "560px", width: "88%" }}
            >
              <Table aria-label="custom pagination table">
                <TableHead sx={{ background: "none !important" }}>
                  <TableRow>
                    <TableCell sx={{ color: "black", fontSize: "11.5px" }}>
                      Quantity
                    </TableCell>
                    <TableCell sx={{ color: "black", fontSize: "11.5px" }}>
                      Item Code
                    </TableCell>
                    <TableCell sx={{ color: "black", fontSize: "11.5px" }}>
                      Item Description
                    </TableCell>
                    <TableCell sx={{ color: "black", fontSize: "11.5px" }}>
                      UOM
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{ maxHeight: "520px" }}>
                  {clientDetails?.freebies?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontSize: "10.5px" }}
                      >
                        {row?.quantity}
                      </TableCell>
                      <TableCell sx={{ fontSize: "10.5px" }}>
                        {row?.items?.itemCode}
                      </TableCell>
                      <TableCell sx={{ fontSize: "10.5px" }}>
                        {row?.items?.itemDescription}
                      </TableCell>
                      <TableCell sx={{ fontSize: "10.5px" }}>
                        {row?.items?.uom}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Signatures Start  */}
            <Stack
              justifyContent="space-between"
              flexDirection="row"
              width="85%"
              mb={1}
            >
              <Box width="25%" mt={3}>
                <Typography textAlign="center" fontSize="12.5px" mt={1}>
                  {fullname}
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
              </Box>

              <Box width="30%" mt={1}>
                <Box display="flex" flexDirection="row">
                  {signatureValue?.value ? (
                    <>
                      <img
                        src={signatureValue?.value}
                        width={"200px"}
                        height={"37px"}
                      />
                      <IconButton
                        onClick={() => {
                          // signCanvasRef?.current.clear();
                          setSignatureValue({
                            value: "",
                            isSigned: false,
                          });
                        }}
                      >
                        <Clear />
                      </IconButton>
                    </>
                  ) : (
                    <Box sx={{ width:'100%', display: "flex", justifyContent: "center" }}>
                      <IconButton
                        onClick={() =>
                          dispatch(toggleModal("isSignatureCanvas"))
                        }
                      >
                        <Draw sx={{ fontSize: "35px" }} />
                      </IconButton>
                    </Box>
                    // <ReactSignatureCanvas
                    //   ref={signCanvasRef}
                    //   canvasProps={{ width: 240, height: 40 }}
                    //   onEnd={() =>
                    //     setSignatureValue({
                    //       value: signCanvasRef?.current?.toDataURL(),
                    //       isSigned: true,
                    //     })
                    //   }
                    // />
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
            <SignatureCanvas
              // signCanvasRef={signCanvasRef}
              signatureValue={signatureValue}
              setSignatureValue={setSignatureValue}
            />
            {/* Signatures Start End  */}

            <></>
          {/* Proof of Delivery  */}
          <Stack width="100%" mt={3}>
            {isCameraActive ? (
              <div>
                <Webcam
                  audio={false}
                  screenshotFormat="image/jpeg"
                  width={240}
                  height={180}
                  ref={webcamRef}
                />
                <IconButton onClick={handleCapturePhoto}>
                  <CameraAlt fontSize="50px" />
                </IconButton>
                <IconButton onClick={toggleCamera}>
                  <Close />
                </IconButton>
              </div>
            ) : (
              <>
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Typography fontSize="13.5px">Proof of Delivery</Typography>
                  {proofOfDeliveryFiles ? (
                    <>
                      <IconButton onClick={handleRemoveProofOfDelivery}>
                        <Clear />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        {...getRootProps()}
                        className={`dropzone ${
                          proofOfDeliveryFiles ? "active" : ""
                        }`}
                      >
                        <AttachFile />
                      </IconButton>
                      <input {...getInputProps()} />
                      <IconButton onClick={toggleCamera}>
                        <CameraAlt />
                      </IconButton>
                    </>
                  )}
                </Box>
                {isInvalidFile && (
                  <div>
                    <Typography fontSize="10.5px" color="red">
                      Invalid file type. Please upload a valid image file.
                    </Typography>
                  </div>
                )}
                {proofOfDeliveryFiles && !isInvalidFile && (
                  <div>
                    <Typography fontSize="10.5px" color="green">
                      {`${proofOfDeliveryFiles?.name || "Photo"}`} uploaded
                      successfully
                    </Typography>
                  </div>
                )}
              </>
            )}
          </Stack>
          {/* Proof of Delivery End */}
          </Stack>
          {/* Print End  */}


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
                startIcon={<Check />}
                className="primaryButtons"
                onClick={handleReleasing}
              >
                {"Release"}
              </Button>
            </ButtonGroup>
          )}
        </Stack>
      </Box>
    </Modal>
  );
};
