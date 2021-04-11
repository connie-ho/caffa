import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContext from "./contexts/AuthContext";
// import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContext.Provider>
        <App />
      </AuthContext.Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

