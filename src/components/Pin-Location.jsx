import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../services/store/disclosureSlice";
import { Box, Button, IconButton, Modal, Stack } from "@mui/material";
import { EditLocation } from "@mui/icons-material";
import {
  GoogleMap,
  useLoadScript,
  MarkerF as Marker,
} from "@react-google-maps/api";

const PinLocation = ({ iconSize, businessAddress }) => {
  const dispatch = useDispatch();
  const { isPinLocation } = useSelector((state) => state.disclosure.modals);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyARUuQTuMNGcIB2vhuiH8MdoWaH_ALumxA",
  });

  const center = useMemo(() => ({ lat: 15.0944152, lng: 120.6075827 }), []);

  return (
    <>
      <IconButton
        disabled={!businessAddress}
        title={!businessAddress ? "Provide an address first" : ""}
        onClick={() => dispatch(toggleModal("isPinLocation"))}
      >
        <EditLocation
          sx={{ mb: "3px", mr: "5px", fontSize: iconSize ? iconSize : "" }}
        />
      </IconButton>
      <Modal
        open={isPinLocation}
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
              height: "100%",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "white",
              px: 2,
            }}
          >
            {!isLoaded ? (
              <>Loading...</>
            ) : (
              <>
                <GoogleMap
                  zoom={15} // Adjust the zoom level as needed
                  center={center}
                  mapContainerClassName="map-container"
                  mapContainerStyle={{height: '90%', width:'100%'}}
                >
                  <Marker position={center} clickable title="Hello world" />
                </GoogleMap>
              </>
            )}
            <Button onClick={() => dispatch(toggleModal("isPinLocation"))}>
              Close
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default PinLocation;
