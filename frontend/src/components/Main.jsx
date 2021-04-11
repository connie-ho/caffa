import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useState} from 'react';

import Nav from './Nav';
import Login from './Login';
import Home from './Home';
import CoffeeList from './coffees/CoffeeList';
import SearchList from './image-search/SearchList';
import Coffees from './coffees/Coffees';
import CoffeeContext from '../contexts/CoffeeContext';
import UserContext from '../contexts/UserContext';
import ReviewContext from '../contexts/ReviewContext';
import SearchContext from '../contexts/SearchContext';

const Main = (props) => {

  const {state, setState} = props;
  const [results, setResults] = useState(
    {
      url:'',
      textArray: [],
      
    }
  )

  return (
    <div>
      <Router>
      <CoffeeContext.Provider value={{coffees: state.coffees}}>
      <SearchContext.Provider value={{results, setResults}}>
        <Nav />
      </SearchContext.Provider >
      </CoffeeContext.Provider>
        <Switch>
          <CoffeeContext.Provider value={{coffees: state.coffees}}>
          <ReviewContext.Provider value={{reviews: state.reviews}}>
            <Route path="/coffees" >
              <CoffeeList/>
            </Route>
            <Route path="/search">
              <SearchList results={results} coffees={state.coffees} reviews={state.reviews}/>
            </Route>
          </ReviewContext.Provider>
          </CoffeeContext.Provider>
          <Route path="/coffees" >
            <Coffees />
          </Route>
          <Route path="/login" >
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  )
};

export default Main;
