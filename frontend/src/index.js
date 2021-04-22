import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles";
// import * as serviceWorker from "./serviceWorker";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFlask, faFire, faDna } from "@fortawesome/free-solid-svg-icons";

library.add(faFlask, faDna, faFire);

let theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#DEBB63",
    },
    secondary: {
      main: "#646264",
    },
    text: {
      primary: "#252b2d",
      secondary: "rgba(61,58,58,0.54)",
      light: "rgb(250, 244, 234)",
    },
    background: {
      default: "#ffffff",
      secondary: "rgb(249,246,235)",
    },
  },
  typography: {
    fontFamily: "Roboto",
    h1: {
      fontFamily: "Playfair Display",
    },
    h2: {
      fontFamily: "Playfair Display",
    },
    h3: {
      fontFamily: "Roboto",
    },
    h4: {
      fontFamily: "Roboto",
      color: "#646264",
    },
    h5: {
      fontFamily: "Roboto",
    },
    h6: {
      fontFamily: "Roboto",
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  overrides: {
    // Style sheet name ⚛️
    MuiOutlinedInput: {
      root: {
        "& $notchedOutline": {
          borderColor: "#d3d3d3",
          borderWidth: 0.5,
        },
      },
    },
    MuiButton: {
      outlinedPrimary: {
        color: "#646264",
        border: "2px solid #DEBB63",
        borderRadius: "1rem",
        "&:hover": {
          border: "3px solid #DEBB63",
          backgroundColor: "#DEBB63",
          color: "white",
          "@media (hover: none)": {
            color: 'black',
            "&:active": {
              backgroundColor: '#DEBB63'
            }
          }
        },
        
      },
    },
  },
});

theme = responsiveFontSizes(theme);

ReactDOM.render(
  <React.StrictMode>
    {/* <Router> */}
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    {/* </Router> */}
  </React.StrictMode>,
  document.getElementById("root")
);
