import React from "react";
import { Drawer } from "@mui/material";
import { useSelector } from "react-redux";

export const DirectForm = () => {
  const { isDirectForm } = useSelector((state) => state.disclosure.drawers);

  return (
    <Drawer
      open={isDirectForm}
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
      <form>Form for Direct Registration</form>
    </Drawer>
  );
};
