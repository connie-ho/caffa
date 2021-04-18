import React, { useEffect, useState } from "react";
import Main from './components/Main';
import NotLoggedIn from './components/NotLoggedIn'
import axios from 'axios';
import "./App.css";

import DataContext from './contexts/DataContext';
import UserContext from './contexts/UserContext';

import useApplicationData from './hooks/useApplicationData';

function App() {

  // user logic
  const [user, setUser] = useState(null);
  // const [homeCoffees, setHomeCoffees] = useState(null);

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
        console.log('there was an error authenticating')
      })
    }, []);

  const loginHandler = (email,password) => {
    return axios.post("/api/users/login", {email: email, password: password})
      .then(res => {
        setUser(res.data)
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  const editUserHandler = (first_name, last_name, email, password) => {
    return axios.post("/api/users/edit", {first_name: first_name, last_name: last_name, email: email, password: password})
      .then(res => {
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  const registerHandler = (firstName, lastName, email, password) => {
    return axios.post("/api/users/register", {first_name: firstName, last_name: lastName, email: email, password: password })
    .then(res => {
      console.log(res)
      setUser(res.data)
      return 'ok'
    })
    .catch(err => {
      return 'bad'
    })
  }

  const logoutHandler = () => {
    axios
      .post("/api/users/logout")
      .then(res => setUser(res.data))
  }

  const getUserReviews = () => {
    
  }


  const {
    state, 
    addFavourite, 
    deleteFavourite, 
    addReview,
    editReview,
    deleteReview, 
    addCoffee} = useApplicationData();

  return (
    <div className="App">
      <UserContext.Provider value={{user, loginHandler, openLogin, setOpenLogin, registerHandler, editUserHandler}}>
        <NotLoggedIn 
          handleLoginClose={handleLoginClose}
        />
        <DataContext.Provider value={{state}}>
          <Main 
            addFavourite={addFavourite}
            deleteFavourite={deleteFavourite}
            addReview={addReview}
            editReview={editReview}
            deleteReview={deleteReview}
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
