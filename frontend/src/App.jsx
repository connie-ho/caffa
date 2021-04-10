import Main from './components/Main'
import "./App.css";

import useApplicationData from './hooks/useApplicationData';

function App() {

  const {state} = useApplicationData();

  return (
    <div className="App">
      <Main 
        coffees={state.coffees}
      />
    </div>
  );
}

export default App;
