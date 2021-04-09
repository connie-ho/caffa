import Main from './components/Main'
import "./App.css";

import useApplicationData from './hooks/useApplicationData';

function App() {

  const state = useApplicationData();
  console.log(state)

  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
