import { createTheme } from "@mui/material";

const colorSchemes = {
  // light: {
  //   primary: "#212121",
  //   secondary: "#757575",
  //   accent: "#766bb9",
  //   error: "#ed5574",
  // },
  dark: {
    // primary: "#23024a",
    // secondary: "#544d91",
    primary: "#544d91",
    secondary: "#243448",
    accent: "#766bb9",
    error: "#F30737",
  },
};

// const lightTheme = createTheme({
//   palette: {
//     mode: "light",
//     primary: {
//       main: colorSchemes.light.primary,
//     },
//     secondary: {
//       main: colorSchemes.light.secondary,
//     },
//     error: {
//       main: colorSchemes.light.error,
//     },
//   },
// });

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
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: colorSchemes.dark.secondary,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: colorSchemes.dark.primary,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: `${colorSchemes.dark.secondary} !important`,
          },
          "& .Mui-active .MuiOutlinedInput-notchedOutline": {
            color: `${colorSchemes.dark.secondary} !important`,
            borderColor: `${colorSchemes.dark.secondary} !important`,
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            color: `${colorSchemes.dark.secondary} !important`,
            borderColor: `${colorSchemes.dark.secondary} !important`,
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: `${colorSchemes.dark.primary} !important`,
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          maxHeight: "700px",
          background: "white",
          padding: 0,
          margin: 0
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          minWidth: 500,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          background: colorSchemes.dark.primary,
          position: "sticky",
          top: 0,
          zIndex: 1,
        },
      },
    },
    MuiTableBody: {
      maxHeight: "400px",
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: "white",
        },
        body: {
          color: colorSchemes.dark.secondary,
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          backgroundColor: colorSchemes.dark.primary,
          border: '2px',
          position: "sticky",
          bottom: 0,
          zIndex: 1,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: colorSchemes.dark.secondary,
          padding: 0,
        },
      },
    },
  },
});

export {
  // lightTheme,
  darkTheme,
};
