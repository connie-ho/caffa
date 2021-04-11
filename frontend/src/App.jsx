import React from "react";
import Main from './components/Main';
import "./App.css";

import CoffeeContext from './contexts/CoffeeContext';
import ReviewContext from './contexts/ReviewContext';

import useApplicationData from './hooks/useApplicationData';

function App() {

  const {users, coffees, reviews, favourites, setUsers, setCoffees, setFavourites, setReviews} = useApplicationData();


  return (
    <div className="App">
      <CoffeeContext.Provider value ={{coffees, setCoffees}}>
      <ReviewContext.Provider value ={{reviews, setReviews}}>
        <Main />
      </ReviewContext.Provider>
      </CoffeeContext.Provider>
    </div>
  );
}

export default App;
