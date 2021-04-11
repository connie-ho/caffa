import React from "react";
import Main from './components/Main';
import "./App.css";

import DataContext from './contexts/DataContext';
import FavouriteContext from './contexts/DataContext';


import useApplicationData from './hooks/useApplicationData';

function App() {

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
