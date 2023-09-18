import React, { useCallback, useEffect, useState } from "react";
import { Box, IconButton, Radio, Stack, Typography } from "@mui/material";
import { AttachFile, CameraAlt, Edit, InsertPhoto } from "@mui/icons-material";
import { toggleModal } from "../../../../../services/store/disclosureSlice";
import { useDispatch } from "react-redux";
import SignatureCanvas from "../../../../../components/Signature-Canvas";
import { useDropzone } from "react-dropzone";

export const Attachments = ({ setAttachments, setCanSubmit }) => {
  const dispatch = useDispatch();
  const [attachmentType, setAttachmentType] = useState("");
  const [signatureValue, setSignatureValue] = useState({
    value: "",
    isSigned: false,
  });

  const [ownerRequirements, setOwnerRequirements] = useState({
    ownerSignature: "",
    storePhoto: "",
    businessPermit: "",
    validIdOwner: "",
  });

  const [representativeRequirements, setRepresentativeRequirements] = useState({
    representativeSignature: "",
    storePhoto: "",
    businessPermit: "",
    validIdRepresentative: "",
    validIdOwner: "",
    authorizationLetter: "",
  });

  const [currentFile, setCurrentFile] = useState("");
  const [isInvalidFile, setIsInvalidFile] = useState(false);
  const [fileName, setFileName] = useState("");
  const onDropProofOfDelivery = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setIsInvalidFile(true);
    } else {
      setIsInvalidFile(false);
      setCurrentFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDropProofOfDelivery,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    multiple: true,
  });

  useEffect(() => {
    const imageType = "image/jpeg";
    let renamedFile;
    if (currentFile && fileName) {
      renamedFile = new File([currentFile], `${fileName}_${Date.now()}.jpg`, {
        type: imageType,
      });
    }
    if (signatureValue?.value && attachmentType) {
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
        `${attachmentType}_signature_${Date.now()}.jpg`,
        { type: imageType }
      );
      setOwnerRequirements((prevOwnerRequirements) => ({
        ...prevOwnerRequirements,
        ownerSignature: renamedSignatureImage,
      }));
      setRepresentativeRequirements((prevRepresentativeRequirements) => ({
        ...prevRepresentativeRequirements,
        representativeSignature: renamedSignatureImage,
      }));
    }
    if (attachmentType === "owner") {
      if (fileName === "storePhoto") {
        setOwnerRequirements((prevOwnerRequirements) => ({
          ...prevOwnerRequirements,
          storePhoto: renamedFile,
        }));
      }
      if (fileName === "businessPermit") {
        setOwnerRequirements((prevOwnerRequirements) => ({
          ...prevOwnerRequirements,
          businessPermit: renamedFile,
        }));
      }
      if (fileName === "validIdOwner") {
        setOwnerRequirements((prevOwnerRequirements) => ({
          ...prevOwnerRequirements,
          validIdOwner: renamedFile,
        }));
      }
    } else if (attachmentType === "representative") {
      if (fileName === "storePhoto") {
        setRepresentativeRequirements((prevRepresentativeRequirements) => ({
          ...prevRepresentativeRequirements,
          storePhoto: renamedFile,
        }));
      }
      if (fileName === "businessPermit") {
        setRepresentativeRequirements((prevRepresentativeRequirements) => ({
          ...prevRepresentativeRequirements,
          businessPermit: renamedFile,
        }));
      }
      if (fileName === "validIdRepresentative") {
        setRepresentativeRequirements((prevRepresentativeRequirements) => ({
          ...prevRepresentativeRequirements,
          validIdRepresentative: renamedFile,
        }));
      }
      if (fileName === "validIdOwner") {
        setRepresentativeRequirements((prevRepresentativeRequirements) => ({
          ...prevRepresentativeRequirements,
          validIdOwner: renamedFile,
        }));
      }
      if (fileName === "authorizationLetter") {
        setRepresentativeRequirements((prevRepresentativeRequirements) => ({
          ...prevRepresentativeRequirements,
          authorizationLetter: renamedFile,
        }));
      }
    }
  }, [currentFile]);

  const handleAttachmentType = (type) => {
    if (type === "owner") {
      setAttachmentType("owner");
    } else if (type === "representative") {
      setAttachmentType("representative");
    }
    setFileName("");
    setOwnerRequirements({
      ownerSignature: signatureValue?.value,
      storePhoto: "",
      businessPermit: "",
      validIdOwner: "",
    });
    setRepresentativeRequirements({
      representativeSignature: signatureValue?.value,
      storePhoto: "",
      businessPermit: "",
      validIdRepresentative: "",
      validIdOwner: "",
      authorizationLetter: "",
    });
    setSignatureValue({
      value: "",
      isSigned: false,
    });
  };

  function hasEmptyStrings(obj) {
    return Object.values(obj).some((value) => value === "");
  }
  const isRequiredFieldsFilled = () => {
    if (attachmentType === "owner") {
      if (!hasEmptyStrings(ownerRequirements)) {
        // const formData = new FormData();
        // formData.append("ownerSignature", ownerRequirements?.ownerSignature);
        // formData.append("storePhoto", ownerRequirements?.storePhoto);
        // formData.append("businessPermit", ownerRequirements?.businessPermit);
        // formData.append("validIdOwner", ownerRequirements?.validIdOwner);
        setAttachments(ownerRequirements);
        setCanSubmit(true);
      } else {
        setCanSubmit(false);
      }
    }
    if (attachmentType === "representative") {
      if (!hasEmptyStrings(representativeRequirements)) {
        // const formData = new FormData();
        // formData.append(
        //   "representativeSignatue",
        //   representativeRequirements?.representativeSignature
        // );
        // formData.append("storePhoto", representativeRequirements?.storePhoto);
        // formData.append(
        //   "businessPermit",
        //   representativeRequirements?.businessPermit
        // );
        // formData.append(
        //   "validIdRepresentative",
        //   representativeRequirements?.validIdRepresentative
        // );
        // formData.append(
        //   "validIdOwner",
        //   representativeRequirements?.validIdOwner
        // );
        // formData.append(
        //   "authorizationLetter",
        //   representativeRequirements?.authorizationLetter
        // );
        setAttachments(representativeRequirements);
        setCanSubmit(true);
      } else {
        setCanSubmit(false);
      }
    }
  };

  useEffect(() => {
    isRequiredFieldsFilled();

    return () => {
      setCanSubmit(false);
    };
  }, [ownerRequirements || representativeRequirements]);

  return (
    <>
      <Stack flexDirection="row" gap={1} mt="100px">
        <Stack
          minHeight="380px"
          width="50%"
          border="1px solid black"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontStyle="italic" fontWeight={700} color="primary.main">
            Owner's Requirements
          </Typography>
          <Stack mt={1} gap={2}>
            <Box display="flex" justifyContent="space-between" gap={3}>
              <Typography>Customer's Signature</Typography>
              <IconButton
                onClick={() => dispatch(toggleModal("isSignatureCanvas"))}
                disabled={
                  attachmentType === "representative" || !attachmentType
                }
                title={!attachmentType ? "Select attachment type first" : ""}
              >
                <Edit sx={{ border: "1px solid black" }} />
              </IconButton>
            </Box>
            <Box display="flex" justifyContent="space-between" gap={1}>
              <Typography>Store Photo</Typography>
              <IconButton
                {...getRootProps({
                  onClick: (event) => setFileName("storePhoto"),
                })}
                className={`dropzone ${currentFile ? "active" : ""}`}
                title={!attachmentType ? "Select attachment type first" : ""}
              >
                <InsertPhoto sx={{ border: "1px solid black" }} />
              </IconButton>
            </Box>
            <Box display="flex" justifyContent="space-between" gap={1}>
              <Typography>Business Permit</Typography>
              <IconButton
                {...getRootProps({
                  onClick: (event) => setFileName("businessPermit"),
                })}
                className={`dropzone ${currentFile ? "active" : ""}`}
                title={!attachmentType ? "Select attachment type first" : ""}
              >
                <AttachFile
                  sx={{ border: "1px solid black", rotate: "180%" }}
                />
              </IconButton>
            </Box>
            <Box display="flex" justifyContent="space-between" gap={1}>
              <Typography>Valid ID of Owner</Typography>
              <IconButton
                {...getRootProps({
                  onClick: (event) => setFileName("validIdOwner"),
                })}
                className={`dropzone ${currentFile ? "active" : ""}`}
                title={!attachmentType ? "Select attachment type first" : ""}
              >
                <CameraAlt sx={{ border: "1px solid black" }} />
              </IconButton>
            </Box>
          </Stack>
          <Radio
            name="attachmentType"
            checked={attachmentType === "owner"}
            onChange={() => handleAttachmentType("owner")}
          />
        </Stack>

        <Stack
          minHeight="380px"
          width="50%"
          border="1px solid black"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontStyle="italic" fontWeight={700} color="primary.main">
            Representative's Requiements
          </Typography>
          <Stack mt={1} gap={2}>
            <Box display="flex" justifyContent="space-between" gap={3}>
              <Typography>Representative's Signature</Typography>
              <IconButton
                onClick={() => dispatch(toggleModal("isSignatureCanvas"))}
                disabled={attachmentType === "owner" || !attachmentType}
                title={!attachmentType ? "Select attachment type first" : ""}
              >
                <Edit sx={{ border: "1px solid black" }} />
              </IconButton>
            </Box>
            <Box display="flex" justifyContent="space-between" gap={1}>
              <Typography>Store Photo</Typography>
              <IconButton
                {...getRootProps({
                  onClick: (event) => setFileName("storePhoto"),
                })}
                className={`dropzone ${currentFile ? "active" : ""}`}
                disabled={attachmentType === "owner" || !attachmentType}
                title={!attachmentType ? "Select attachment type first" : ""}
              >
                <InsertPhoto sx={{ border: "1px solid black" }} />
              </IconButton>
            </Box>
            <Box display="flex" justifyContent="space-between" gap={1}>
              <Typography>Business Permit</Typography>
              <IconButton
                {...getRootProps({
                  onClick: (event) => setFileName("businessPermit"),
                })}
                className={`dropzone ${currentFile ? "active" : ""}`}
                disabled={attachmentType === "owner" || !attachmentType}
                title={!attachmentType ? "Select attachment type first" : ""}
              >
                <AttachFile
                  sx={{ border: "1px solid black", rotate: "180%" }}
                />
              </IconButton>
            </Box>
            <Box display="flex" justifyContent="space-between" gap={1}>
              <Typography>Valid ID of Representative</Typography>
              <IconButton
                {...getRootProps({
                  onClick: (event) => setFileName("validIdRepresentative"),
                })}
                className={`dropzone ${currentFile ? "active" : ""}`}
                disabled={attachmentType === "owner" || !attachmentType}
                title={!attachmentType ? "Select attachment type first" : ""}
              >
                <CameraAlt sx={{ border: "1px solid black" }} />
              </IconButton>
            </Box>
            <Box display="flex" justifyContent="space-between" gap={1}>
              <Typography>Valid ID of Owner</Typography>
              <IconButton
                {...getRootProps({
                  onClick: (event) => setFileName("validIdOwner"),
                })}
                className={`dropzone ${currentFile ? "active" : ""}`}
                disabled={attachmentType === "owner" || !attachmentType}
                title={!attachmentType ? "Select attachment type first" : ""}
              >
                <CameraAlt sx={{ border: "1px solid black" }} />
              </IconButton>
            </Box>
            <Box display="flex" justifyContent="space-between" gap={1}>
              <Typography>Authorization Letter</Typography>
              <IconButton
                {...getRootProps({
                  onClick: (event) => setFileName("authorizationLetter"),
                })}
                className={`dropzone ${currentFile ? "active" : ""}`}
                disabled={attachmentType === "owner" || !attachmentType}
                title={!attachmentType ? "Select attachment type first" : ""}
              >
                <AttachFile sx={{ border: "1px solid black" }} />
              </IconButton>
            </Box>
          </Stack>
          <Radio
            name="attachmentType"
            checked={attachmentType === "representative"}
            onChange={() => handleAttachmentType("representative")}
          />
        </Stack>
      </Stack>
      <SignatureCanvas
        // signCanvasRef={signCanvasRef}
        signatureValue={signatureValue}
        setSignatureValue={setSignatureValue}
      />
    </>
  );
};
