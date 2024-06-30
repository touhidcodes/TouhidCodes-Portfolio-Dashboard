import { createTheme } from "@mui/material";
import localFont from "next/font/local";

// Load the Chillax font
const chillax = localFont({
  src: "../../public/fonts/Chillax.woff2",
  variable: "--font-chillax",
});

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
          // backgroundImage: "linear-gradient(to bottom, #f6d5f7, #fbe9d7)",
          "&:hover": {
            backgroundColor: "#d3dbde",
          },
        },
        outlined: {
          padding: "12px 30px",
          backgroundImage: "linear-gradient(to bottom, #f6d5f7, #fbe9d7)",
          color: "#ff793f",
          fontWeight: "700",
          fontSize: "16px",
          fontFamily: "Chillax",
          borderRadius: "10px",
          textTransform: "none",
          border: "2px solid #ff793f",
          "&:hover": {
            backgroundColor: "#ff5722",
            color: "#fff",
            border: "2px solid #ff5722",
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
