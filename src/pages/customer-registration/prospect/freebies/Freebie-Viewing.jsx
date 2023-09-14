import React, { useRef, useState } from "react";
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
  Dialog,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../../../services/store/disclosureSlice";
import { useDefaultStyles } from "../../../../hooks/useDefaultStyles";
import { useGetItemsQuery } from "../../../../services/api";
import { Image, Print, ImageNotSupported } from "@mui/icons-material";
import { useReactToPrint } from "react-to-print";

export const FreebieViewing = () => {
  const dispatch = useDispatch();
  const printRef = useRef();
  const { defaultButtonStyle } = useDefaultStyles();
  const { isFreebieViewing } = useSelector((state) => state.disclosure.modals);
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
    ownersAddress: selectedRowData?.address,
    phoneNumber: selectedRowData?.phoneNumber,
    transactionNumber: selectedRowData?.transactionNumber,
    freebies: defaultFreebieValues || [],
  };

  const printContent = useReactToPrint({
    content: () => printRef?.current,
  });

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
            <Typography
              fontWeight="bold"
              fontSize="12.5px"
              mt={1}
              textAlign="center"
            >
              Freebie From
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
              <Box width="30%" mt={2}>
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

              <Box width="30%" mt={selectedRowData?.eSignaturePath ? "" : 3}>
                <Box display="flex" flexDirection="row" justifyContent="center">
                  {selectedRowData?.eSignaturePath ? (
                    <img
                      src={selectedRowData?.eSignaturePath || ""}
                      width={"220px"}
                      height={"39px"}
                    />
                  ) : (
                    <Typography fontSize="small" fontStyle="italic">
                      No signature provided
                    </Typography>
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
            {/* Signatures End  */}

            <></>
            {selectedRowData?.photoProofPath ? (
              <PhotoProof />
            ) : (
              <Stack
                width="100%"
                flexDirection="row"
                alignItems="center"
                justifyContent="start"
              >
                <ImageNotSupported sx={{ color: "black !important" }} />
                <Typography
                  sx={{
                    fontSize: "small",
                    fontStyle: "italic",
                  }}
                >
                  no proof of delivery provided
                </Typography>
              </Stack>
            )}
          </Stack>
          {/* Print End  */}

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
            <Button
              className="cancelButtons"
              onClick={() => dispatch(toggleModal("isFreebieViewing"))}
            >
              Close
            </Button>
            <Button
              startIcon={<Print />}
              className="primaryButtons"
              onClick={() => printContent()}
            >
              {"Print"}
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>
    </Modal>
  );
};

const PhotoProof = () => {
  const { selectedRowData } = useSelector((state) => state.selectedRowData);
  const image = selectedRowData?.photoProofPath || "";
  const [open, setOpen] = useState(false);

  return (
    <Stack
      width="100%"
      flexDirection="row"
      alignItems="center"
      justifyContent="start"
    >
      <Image
        sx={{ color: "black !important", cursor: "pointer" }}
        onClick={() => setOpen(true)}
      />
      <Typography
        sx={{
          cursor: "pointer",
          fontSize: "small",
          fontStyle: "italic",
        }}
        onClick={() => setOpen(true)}
      >
        with proof of delivery
      </Typography>
      <Dialog fullWidth open={open} onClose={() => {}}>
        <Box>
          <img
            src={image || ""}
            style={{
              maxWidth: "100%",
              maxHeight: "calc(100vh - 150px)",
              display: "block",
              margin: "0 auto",
            }}
          />
        </Box>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </Dialog>
    </Stack>
  );
};
