import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useState} from 'react';

import Nav from './Nav';
import Login from './Login';
import Home from './Home';
import CoffeeList from './coffees/CoffeeList';
import SearchList from './image-search/SearchList';
import Coffees from './coffees/Coffees';
import UserContext from '../contexts/UserContext';

import ReviewContext from '../contexts/ReviewContext';
import SearchContext from '../contexts/SearchContext';

const Main = (props) => {

  
  const {addFavourite} = props;

  const [results, setResults] = useState(
    {
      url:'',
      textArray: [],
      
    }
  )

  return (
    <div>
      <Router>
      <SearchContext.Provider value={{results, setResults}}>
        <Nav />
      </SearchContext.Provider >

        <Switch>
            <Route path="/coffees" >
              <CoffeeList/>
            </Route>
            <Route path="/search">
              <SearchList results={results}/>
            </Route>
          <Route path="/coffees" >
            <Coffees 
              addFavourite={addFavourite}
            />
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
