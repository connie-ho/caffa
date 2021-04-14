import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import './index.scss'
import UserContext from "./contexts/UserContext";
import { createMuiTheme, makeStyles, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
// import * as serviceWorker from "./serviceWorker";

let theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#f7bc2c',
    },
    text: {
      primary: 'rgba(0,0,0,0.87)',
      secondary: 'rgba(61,58,58,0.54)',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    h1: {
      fontFamily: 'Playfair Display'
    },
    h2: {
      fontFamily: 'Playfair Display'
    },
    h3: {
      fontFamily: 'Playfair Display'
    },
    h4: {
      fontFamily: 'Playfair Display'
    },
    h5: {
      fontFamily: 'Playfair Display'
    },
    h6: {
      fontFamily: 'Playfair Display'
    },
  },
})

theme = responsiveFontSizes(theme)

 ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

