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

  const [center, setCenter] = useState({ lat: 15.0594, lng: 120.6567 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!businessAddress) return;

    const apiKey = "AIzaSyARUuQTuMNGcIB2vhuiH8MdoWaH_ALumxA";
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      businessAddress
    )}&key=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK" && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          const lat = location.lat;
          const lng = location.lng;
          setCenter({ lat, lng });
        } else {
          setError(
            `Unable to locate ${businessAddress}. Please provide more specific details regarding location.`
          );
        }
      })
      .catch((error) => {
        setError("Error fetching data: " + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [businessAddress]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyARUuQTuMNGcIB2vhuiH8MdoWaH_ALumxA",
  });

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
            ) : loading ? (
              <>Fetching location...</>
            ) : error ? (
              <div>Error: {error}</div>
            ) : (
              <>
                <GoogleMap
                  zoom={15} // Adjust the zoom level as needed
                  center={center}
                  mapContainerClassName="map-container"
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
