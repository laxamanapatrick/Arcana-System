import { useTheme } from "@mui/material";

export const useDefaultStyles = () => {
  const theme = useTheme();

  const disabledBg = "6c5982";

  const defaultButtonStyle = {
    ".primaryButtons": {
      width: "90px",
      fontSize: "11px",
      color: theme.palette.common.white,
      bgcolor: theme.palette.secondary.main,
      ":hover": {
        color: theme.palette.common.white,
        bgcolor: theme.palette.primary.main,
        variant: "contained",
      },
      ":disabled": {
        color: theme.palette.common.white,
        bgcolor: disabledBg,
        border: `none`,
        "&.MuiButtonBase-root:disabled": {
          cursor: "not-allowed",
          pointerEvents: "auto",
        },
      },
    },
    ".cancelButtons": {
      width: "90px",
      fontSize: "11px",
      color: 'gray',
      bgcolor: theme.palette.common.white,
      border: '1px solid gray',
      ":hover": {
        color: theme.palette.common.white,
        bgcolor: 'gray',
        border: `1px solid ${theme.palette.common.white}`,
        variant: "contained",
      },
      ":disabled": {
        color: theme.palette.common.white,
        bgcolor: disabledBg,
        border: `none`,
        "&.MuiButtonBase-root:disabled": {
          cursor: "not-allowed",
          pointerEvents: "auto",
        },
      },
    },
    ".addRowButtons": {
      fontSize: "11px",
      color: theme.palette.common.white,
      bgcolor: theme.palette.secondary.main,
      borderWidth: "1px white",
      borderColor: theme.palette.common.white,
      ":hover": {
        color: theme.palette.common.white,
        bgcolor: theme.palette.primary.main,
        variant: "contained",
      },
      ":disabled": {
        color: theme.palette.common.white,
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

  const subNavigationHeaderHeight = 8;

  const defaultPaperHeaderStyle = {
    height: `${subNavigationHeaderHeight}%`,
    maxHeight: `${subNavigationHeaderHeight}%`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "none",
    // background: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    px: 2,
    mx: 1,
    mt: 1,
  };

  const defaultPaperContentStyle = {
    color: theme.palette.secondary.main,
    background: "none",
    // background: theme.palette.primary.main,
    p: 2,
    m: 1,
    height: "95%",
    maxHeight: "95%",
  };

  const defaultTableStyle = {
    maxHeight: "45%",
    background: theme.palette.common.white,
    ".table": {
      minWidth: 500,
    },
    ".tableHead": {
      background: theme.palette.primary.main,
    },
    ".tableHeadCell": {
      color: theme.palette.common.white,
    },
    ".tableBodyCell": {
      color: theme.palette.secondary.main,
    },
    // ".tableFooter": {
    //   display: "flex",
    //   justifyContent: "end",
    // },
    ".actionButton": {
      color: theme.palette.secondary.main,
      padding: 0,
    },
    ".tablePagination": {
      color: theme.palette.secondary.main,
    },
  };

  const actionMenuStyle = {
    background: theme.palette.primary.main,
  };

  return {
    defaultButtonStyle,
    defaultTextFieldStyle,
    mobileTextFieldStyle,
    defaultPaperHeaderStyle,
    defaultPaperContentStyle,
    defaultTableStyle,
    actionMenuStyle,
  };
};
