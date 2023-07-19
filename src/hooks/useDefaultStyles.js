import { useTheme } from "@mui/material";

export const useDefaultStyles = () => {
  const theme = useTheme();

  const textColor = "#d1c9da";
  const disabledBg = "6c5982";

  const defaultButtonStyle = {
    // ".defaultButtons": {
    //   color: textColor,
    //   bgcolor: theme.palette.primary.main,
    //   ":hover": {
    //     color: textColor,
    //     bgcolor: theme.palette.secondary.main,
    //     variant: "contained",
    //   },
    //   ":disabled": {
    //     color: "gray",
    //     bgcolor: "gray",
    //     border: `none`,
    //     "&.MuiButtonBase-root:disabled": {
    //       cursor: "not-allowed",
    //       pointerEvents: "auto",
    //     },
    //   },
    // },
    ".primaryButtons": {
      color: textColor,
      bgcolor: theme.palette.primary.main,
      // border: `1px solid ${theme.palette.secondary.main}`,
      ":hover": {
        color: textColor,
        bgcolor: theme.palette.secondary.main,
        variant: "contained",
      },
      ":disabled": {
        color: textColor,
        bgcolor: disabledBg,
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
        color: textColor,
        bgcolor: disabledBg,
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
    "& .Mui-focused.MuiFormLabel-root": {
      color: `${theme.palette.common.white} !important`,
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: `${theme.palette.secondary.main} !important`,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: "none",
    },
  };

  const mobileTextFieldStyle = {
    size: "small",
    color: `${theme.palette.primary.main} !important`,
    background: `${theme.palette.primary.main} !important`,
    "& .Mui-focused.MuiFormLabel-root": {
      color: `${theme.palette.primary.main} !important`,
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: `${theme.palette.primary.main} !important`,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: "none",
    },
  };

  return { defaultButtonStyle, defaultTextFieldStyle, mobileTextFieldStyle };
};
