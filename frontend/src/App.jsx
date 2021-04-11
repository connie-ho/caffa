import React from "react";
import Main from './components/Main';
import "./App.css";

import useApplicationData from './hooks/useApplicationData';

function App() {
  const {state, setState} = useApplicationData();

  return (
    <div className="App">
      <Main 
        state={state}
        setState={setState}
      />
    </div>
  );
}

export default App;
