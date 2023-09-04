import React from "react";
import { Button, Drawer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../../../../services/store/disclosureSlice";

export const ReleasedToDirectForm = () => {
  const dispatch = useDispatch();
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
        <img
          src="https://res.cloudinary.com/dsalntcwt/image/upload/v1693374393/EI/proof_of_delivery_1693374389248.jpg.png"
          alt="alt"
        />
        <Button
          onClick={() => dispatch(toggleDrawer("isReleasedToDirectForm"))}
        >
          Cancel
        </Button>
      </form>
    </Drawer>
  );
};
