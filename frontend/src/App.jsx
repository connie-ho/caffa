import React, { useState } from "react";
import Main from './components/Main';
import axios from 'axios';
import "./App.css";

import DataContext from './contexts/DataContext';


import useApplicationData from './hooks/useApplicationData';

function App() {

  const [user, setUser] = useState(null);

  const handleLogin = () => {
    console.log("in handle login function")
    axios
      .post("/api/users/login")
      .then(res => console.log("RES :", res))
  }

  const {state} = useApplicationData();
  console.log("IN APP COMP")
  console.log("USER :", user)

  return (
    <div className="App">
      <DataContext.Provider value ={{state}}>
        <Main loginHandler={handleLogin}/>
      </DataContext.Provider>
    </div>
  );
}

export default App;
