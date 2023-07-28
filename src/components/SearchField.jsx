import React from "react";
import { InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

const CustomSearchField = styled(InputBase)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.secondary.main,
  borderColor: theme.palette.secondary.main,
  borderWidth: "1.5px",
  borderStyle: "solid",
  padding: theme.spacing(0),
  paddingLeft: theme.spacing(0.7),
  paddingRight: theme.spacing(0.7), // Add some right padding for the icon
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

const IconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0.7), // Add padding to the icon wrapper
}));

const SearchField = ({ type = "search", ariaLabel = "search", onChange, placement = "left", ...rest }) => {
  const startAdornment = placement === "left" && (
    <IconWrapper>
      <IconButton aria-label="search icon" edge="start">
        <SearchIcon />
      </IconButton>
    </IconWrapper>
  );

  const endAdornment = placement === "right" && (
    <IconWrapper>
      <IconButton aria-label="search icon" edge="end">
        <SearchIcon />
      </IconButton>
    </IconWrapper>
  );

  return (
    <CustomSearchField
      type={type}
      placeholder="Search"
      inputProps={{ "aria-label": ariaLabel }}
      onChange={onChange}
      startAdornment={startAdornment}
      endAdornment={endAdornment}
      {...rest}
    />
  );
};

SearchField.defaultProps = {
  type: "search",
  ariaLabel: "search",
};

export default SearchField;
