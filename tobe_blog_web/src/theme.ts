import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

/**
 * Create system theme via material-ui
 */
const theme = createTheme({
  typography: {
    fontFamily: [
      '"Noto Sans SC"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  palette: {
    primary: {
      light: "#484848",
      main: "#020202",
      dark: "#000000",
    },
    secondary: {
      light: "#ff833a",
      main: "#e65100",
      dark: "#ac1900",
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "1.1rem",
          color: "rgba(0, 0, 0, 0.6) !important",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        content: {
          width: "100%",
        },
        title: {
          maxWidth: "100%",
          display: "block",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          fontSize: "1rem",
        },
      },
    },
  },
});

export default theme;
