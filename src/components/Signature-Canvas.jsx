import React, { useRef } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import ReactSignatureCanvas from "react-signature-canvas";
import { Draw } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../services/store/disclosureSlice";

const SignatureCanvas = ({ signatureValue, setSignatureValue }) => {
  const signCanvasRef = useRef();
  const dispatch = useDispatch();
  const { isSignatureCanvas } = useSelector((state) => state.disclosure.modals);

  return (
    <Modal
      open={isSignatureCanvas}
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
            height: "30%",
            width: "50%",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
            px: 2,
          }}
        >
          <Box sx={{ border: "1px black" }}>
            <ReactSignatureCanvas
              ref={signCanvasRef}
              //   canvasProps={{ width: 200, height: 340 }}
              onEnd={(e) =>
                setSignatureValue({
                  value: signCanvasRef?.current?.toDataURL(),
                  isSigned: true,
                })
              }
            />
          </Box>
          <ButtonGroup
            sx={{
              gap: 2,
              justifyContent: "end",
              display: "flex",
              width: "100%",
            }}
          >
            <Button onClick={() => dispatch(toggleModal("isSignatureCanvas"))}>
              Done
            </Button>
            <Button
              onClick={() => {
                signCanvasRef?.current.clear();
                setSignatureValue({
                  value: "",
                  isSigned: false,
                });
              }}
            >
              Clear
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
    </Modal>
  );
};

export default SignatureCanvas;
