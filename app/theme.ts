"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#A8C4B0", // sage light
      main: "#4F6B59",  // juniper
      dark: "#2A4034",  // pine
    },
    secondary: {
      light: "#E4D3A4", // warm sunlight
      main: "#C6A96A",  // antique brass
      dark: "#8E7341",  // aged bronze
    },
    error: {
      light: "#CFA596",
      main: "#A86A58",
      dark: "#7A4A3C",
    },
    background: {
      default: "#0b1710",
      paper: "#101c14",
    },
    grey: {
      100: "#F3F1EB",
      200: "#DDD8CD",
      300: "#BBB4A6",
      400: "#8E8779",
      500: "#686257",
      600: "#4B473F",
      700: "#343129",
      800: "#22201B",
      900: "#141310",
    },
  },
  typography: {
    fontFamily: "var(--font-inter), sans-serif",
    h1: {
      fontFamily: "var(--font-fraunces), serif",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontFamily: "var(--font-fraunces), serif",
      fontWeight: 700,
    },
    h3: {
      fontFamily: "var(--font-fraunces), serif",
      fontWeight: 600,
    },
    h4: {
      fontFamily: "var(--font-fraunces), serif",
      fontWeight: 600,
    },
    h5: {
      fontFamily: "var(--font-fraunces), serif",
      fontWeight: 600,
    },
    h6: {
      fontFamily: "var(--font-fraunces), serif",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      defaultProps: { variant: "contained", disableElevation: true, disableRipple: true },
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 4,
          fontFamily: "var(--font-inter), sans-serif",
          fontWeight: 500,
        },
      },
    },
    MuiLink: {
      defaultProps: { underline: "none" },
      styleOverrides: {
        root: {
          textDecoration: "none",
          color: "#7E9C87",
          transition: "color 0.3s",
          position: "relative",
          paddingBottom: "3px",
          "&::before": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "2px",
            borderRadius: "4px",
            backgroundColor: "#C6A96A",
            transformOrigin: "right",
            transform: "scaleX(0)",
            transition: "transform 0.3s ease-in-out",
          },
          "&:hover": {
            color: "#A8C4B0",
            "&::before": {
              transformOrigin: "left",
              transform: "scaleX(1)",
            },
          },
        },
      },
    },
  },
});

export default theme;
