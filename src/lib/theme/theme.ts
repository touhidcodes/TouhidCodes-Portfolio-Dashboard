import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FFF8F4",
    },
    secondary: {
      main: "#FF6725",
    },
  },
  typography: {
    fontFamily: "var(--font-chillax), Arial, sans-serif",
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          padding: "12px 30px",
          color: "#fff",
          fontWeight: "700",
          fontSize: "16px",
          borderRadius: "10px",
          textTransform: "none",
          background: "#1F2544",
          "&:hover": {
            backgroundColor: "#071952",
          },
        },
        outlined: {
          padding: "12px 30px",
          color: "#fff",
          fontWeight: "700",
          fontSize: "16px",
          fontFamily: "Chillax",
          borderRadius: "10px",
          textTransform: "none",
          border: "2px solid #1F2544",
          "&:hover": {
            backgroundColor: "#071952",
            color: "#fff",
            border: "2px solid #071952",
          },
        },
        text: {
          padding: "12px 30px",
          background: "#fff",
          color: "#ff793f",
          fontWeight: "700",
          fontSize: "16px",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#fff",
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Chillax';
          src: url('/fonts/Chillax.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
        }
        body, html {
          font-family: 'var(--font-chillax)', Arial, sans-serif;
        }
      `,
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            fontFamily: "Chillax, Arial, sans-serif",
          },
          "& .MuiFormLabel-root": {
            fontFamily: "Chillax, Arial, sans-serif",
          },
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
  },
});

theme.shadows[1] = "0px 5px 22px lightgray";
