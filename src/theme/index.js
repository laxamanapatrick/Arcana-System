import { createTheme } from "@mui/material";

const colorSchemes = {
  light: {
    primary: "#452c63",
    secondary: "#E6E6FA",
    error: "#F30737",
  },
  dark: {
    primary: "#212121",
    secondary: "#757575",
    error: "#ed5574",
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