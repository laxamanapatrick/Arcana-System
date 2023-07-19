import { createTheme } from "@mui/material";

const colorSchemes = {
  light: {
    primary: "#212121",
    secondary: "#757575",
    error: "#ed5574",
  },
  dark: {
    primary: "#23024a",
    secondary: "#7e00d4",
    error: "#F30737",
  },
};

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: colorSchemes.light.primary,
    },
    secondary: {
      main: colorSchemes.light.secondary,
    },
    error: {
      main: colorSchemes.light.error,
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colorSchemes.dark.primary,
    },
    secondary: {
      main: colorSchemes.dark.secondary,
    },
    error: {
      main: colorSchemes.dark.error,
    },
  },
});

export { lightTheme, darkTheme };
