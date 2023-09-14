import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../services/store/disclosureSlice";
import { Box, Button, IconButton, Modal, Stack } from "@mui/material";
import { EditLocation } from "@mui/icons-material";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const PinLocation = ({ iconSize, position, setPosition }) => {
  const dispatch = useDispatch();
  const { isPinLocation } = useSelector((state) => state.disclosure.modals);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    console.log(e)
    setPosition({ lat: lat, lng: lng });
  };

  return (
    <>
      <IconButton onClick={() => dispatch(toggleModal("isPinLocation"))}>
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
            <Box
              sx={{
                height: "80%",
                width: "100%",
              }}
            >
              <MapContainer
                center={[15.0594, 120.6567]}
                zoom={13}
                onClick={(e) => handleMapClick(e)}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={position}
                  icon={L.divIcon({
                    className: "custom-icon",
                    html: '<div class="pin">📍</div>',
                    iconSize: [400, 400],
                  })}
                >
                  <Popup>
                    Latitude: {position.lat.toFixed(6)}
                    <br />
                    Longitude: {position.lng.toFixed(6)}
                  </Popup>
                </Marker>
              </MapContainer>
            </Box>
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
