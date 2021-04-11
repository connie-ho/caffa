import React from "react";
import Main from './components/Main';
import "./App.css";

import DataContext from './contexts/DataContext';


import useApplicationData from './hooks/useApplicationData';

function App() {

  const {state} = useApplicationData();

  return (
    <div className="App">
      <DataContext.Provider value ={{state}}>
        <Main />
      </DataContext.Provider>
    </div>
  );
}

export default App;
