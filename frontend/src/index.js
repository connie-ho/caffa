import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import './index.scss'
import UserContext from "./contexts/UserContext";
import { createMuiTheme, makeStyles, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
// import * as serviceWorker from "./serviceWorker";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFlask, faFire, faDna} from '@fortawesome/free-solid-svg-icons'

library.add(faFlask, faDna, faFire);


let theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#FCE4A2',
    },
    secondary: {
      main: '#646264',
    },
    text: {
      primary: 'rgba(0,0,0,0.87)',
      secondary: 'rgba(61,58,58,0.54)',
    },
    background: {
      default: '#ffffff',
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
      fontFamily: 'Roboto'
    },
    h4: {
      fontFamily: 'Roboto',
      color: '#646264'
    },
    h5: {
      fontFamily: 'Roboto'
    },
    h6: {
      fontFamily: 'Roboto'
    },
  },
  overrides: {
    // Style sheet name ⚛️
    MuiButton: {
      outlinedPrimary: {
        color: '#646264',
        border: '2px solid #FCE4A2',
        borderRadius: '1rem',
        "&:hover": {
          border: '3px solid #FCE4A2'
        },
      }
    },
  },
});

theme = responsiveFontSizes(theme)

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

