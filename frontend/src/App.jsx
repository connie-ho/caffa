import React, { useState } from "react";
import Main from './components/Main';
import axios from 'axios';
import "./App.css";

import DataContext from './contexts/DataContext';
import FavouriteContext from './contexts/DataContext';


import useApplicationData from './hooks/useApplicationData';

function App() {


  const [user, setUser] = useState(null);

  const handleLogin = () => {
    console.log("in handle login function")
    axios
      .post("/api/users/login")
      .then(res => console.log("RES :", res))
  }


  console.log("IN APP COMP")
  console.log("USER :", user)


  const {state, addFavourite} = useApplicationData();
  console.log(state)
  return (
    <div className="App">
      <DataContext.Provider value={{state}}>
        <Main 
          addFavourite={addFavourite}
        />
    
      </DataContext.Provider>
    </div>
  );
}

export default App;
