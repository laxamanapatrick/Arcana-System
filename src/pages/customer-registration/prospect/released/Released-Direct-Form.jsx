import React from "react";
import { Drawer } from "@mui/material";
import { useSelector } from "react-redux";

export const ReleasedToDirectForm = () => {
  const { isReleasedToDirectForm } = useSelector(
    (state) => state.disclosure.drawers
  );

  return (
    <Drawer
      open={isReleasedToDirectForm}
      onClose={() => {}}
      sx={{
        "& .MuiDrawer-paper": {
          width: 965,
          height: "100%",
          background: "none",
          bgcolor: "white",
        },
      }}
      anchor="right"
    >
      <form>
        <img src="https://res.cloudinary.com/dsalntcwt/image/upload/v1693374393/EI/proof_of_delivery_1693374389248.jpg.png" />
      </form>
    </Drawer>
  );
};
