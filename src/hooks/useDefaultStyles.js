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
      color: "gray",
      bgcolor: theme.palette.common.white,
      border: "1px solid gray",
      ":hover": {
        color: theme.palette.common.white,
        bgcolor: "gray",
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

  const actionMenuStyle = {
    background: theme.palette.primary.main,
    width: 'auto'
  };

  return {
    defaultButtonStyle,
    defaultPaperHeaderStyle,
    defaultPaperContentStyle,
    actionMenuStyle,
  };
};
