import { useTheme } from "@mui/material";

export const useDefaultStyles = () => {
  const theme = useTheme();

  const defaultButtonStyle = {
    ".primaryButtons": {
      color: theme.palette.secondary.main,
      bgcolor: theme.palette.primary.main,
      border: `1px solid ${theme.palette.secondary.main}`,
      ":hover": {
        color: theme.palette.primary.main,
        bgcolor: theme.palette.secondary.main,
        variant: "contained",
      },
      ":disabled": {
        color: "gray",
        bgcolor: "gray",
        border: `none`,
        "&.MuiButtonBase-root:disabled": {
          cursor: "not-allowed",
          pointerEvents: "auto",
        },
      },
    },
    ".cancelButtons": {
      color: theme.palette.error.main,
      bgcolor: theme.palette.primary.main,
      border: `1px solid ${theme.palette.error.main}`,
      ":hover": {
        color: theme.palette.primary.main,
        bgcolor: theme.palette.error.main,
        variant: "contained",
      },
      ":disabled": {
        color: "gray",
        bgcolor: "gray",
        border: `none`,
        "&.MuiButtonBase-root:disabled": {
          cursor: "not-allowed",
          pointerEvents: "auto",
        },
      },
    },
  };

  const defaultTextFieldStyle = {
    size: "small",
    color: theme.palette.secondary.main,
    bgcolor: theme.palette.common.white,
    "& .Mui-focused.MuiFormLabel-root": {
      color: `${theme.palette.secondary.main} !important`,
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: `${theme.palette.secondary.main} !important`,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: "none",
    },
  };

  return { defaultButtonStyle, defaultTextFieldStyle };
};
