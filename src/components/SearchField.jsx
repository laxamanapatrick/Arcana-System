import React from "react";
import { InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomSearchField = styled(InputBase)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.secondary.main,
  borderColor: theme.palette.secondary.main,
  borderWidth: "1.5px",
  borderStyle: "solid",
  padding: theme.spacing(0),
  paddingLeft: theme.spacing(0.7),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
  "&.Mui-focused": {
    borderColor: theme.palette.primary.main,
  },
  "&.MuiFocusVisible": {
    borderColor: theme.palette.primary.main,
  },
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
}));

const SearchField = ({ type = "search", ariaLabel = "search", onChange, ...rest }) => {
  return (
    <CustomSearchField
      type={type}
      placeholder="Search"
      inputProps={{ "aria-label": ariaLabel }}
      onChange={onChange} // Pass the onChange prop down
      {...rest}
    />
  );
};

SearchField.defaultProps = {
  type: "search",
  ariaLabel: "search",
};

export default SearchField;
