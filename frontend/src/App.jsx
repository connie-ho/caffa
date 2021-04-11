import React, { useEffect, useState } from "react";
import Main from './components/Main';
import axios from 'axios';
import "./App.css";

import DataContext from './contexts/DataContext';
import FavouriteContext from './contexts/DataContext';


import useApplicationData from './hooks/useApplicationData';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .post("/api/users/authenticate")
      .then(res => 
        setUser(res.data)
      )}, []);

  const loginHandler = (email) => {
    console.log("in handle login function")
    axios
      .post("/api/users/login", {email: 'jl.justin15@gmail.com'})
      .then(res => {setUser(res.data)
      localStorage.setItem('user', res.data)})
  }


  const {state, addFavourite, deleteFavourite} = useApplicationData();


  return (
    <div className="App">
      <DataContext.Provider value={{state}}>
        <Main 
          addFavourite={addFavourite}
          deleteFavourite={deleteFavourite}
          loginHandler={loginHandler}
          user={user}
          setUser={setUser}
        />
    
      </DataContext.Provider>
    </div>
  );
}

export default App;
