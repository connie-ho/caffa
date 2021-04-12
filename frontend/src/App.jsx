import React, { useEffect, useState } from "react";
import Main from './components/Main';
import NotLoggedIn from './components/NotLoggedIn'
import axios from 'axios';
import "./App.css";

import DataContext from './contexts/DataContext';
import UserContext from './contexts/UserContext';
import FavouriteContext from './contexts/DataContext';

import useApplicationData from './hooks/useApplicationData';

function App() {

  // user logic
  const [user, setUser] = useState(null);

  // allows us to enable the modal and close anywhere in the app
  const [openLogin, setOpenLogin] = useState(false); 
  const handleLoginClose = () => {
    setOpenLogin(false);
  };

  useEffect(() => {
    axios
      .post("/api/users/authenticate")
      .then(res => 
        setUser(res.data)
      )
      .catch( res => {
        console.log('w/e')
      })
    }, []);

  const loginHandler = (email,password) => {
    console.log("in handle login function")
    axios.post("/api/users/login", {email: email, password: password})
      .then(res => {
        setUser(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const logoutHandler = () => {
    // console.log("in App.jsx logoutHandler")
    axios
      .post("/api/users/logout")
      .then(res => setUser(res.data))
  }

  // console.log('current user', user)
  const {state, addFavourite, deleteFavourite, addReview, addCoffee} = useApplicationData();

  return (
    <div className="App">
      <UserContext.Provider value={{user, loginHandler, openLogin, setOpenLogin}}>
        <NotLoggedIn 
          handleLoginClose={handleLoginClose}
        />
        <DataContext.Provider value={{state}}>
          <Main 
            addFavourite={addFavourite}
            deleteFavourite={deleteFavourite}
            addReview={addReview}
            addCoffee={addCoffee}
            loginHandler={loginHandler}
            logoutHandler={logoutHandler}
            user={user}
            setUser={setUser}
          />
        </DataContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
