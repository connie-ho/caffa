import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useEffect, useState} from 'react';

import Nav from './Nav';
import Login from './Login';
import NotLoggedIn from './NotLoggedIn';
import Home from './Home';
import CoffeeList from './coffees/CoffeeList';
import SearchList from './image-search/SearchList';
import Coffees from './coffees/Coffees';
import UserContext from '../contexts/UserContext';
import FavouriteContext from '../contexts/FavouriteContext';
import Image from 'material-ui-image'
import ReviewContext from '../contexts/ReviewContext';
import SearchContext from '../contexts/SearchContext';

const Main = (props) => {

  const {addFavourite, deleteFavourite, addReview, addCoffee, user, setUser, loginHandler, logoutHandler} = props;

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
        <Nav 
          logoutHandler={logoutHandler} 
          user={user}
        />
      </SearchContext.Provider >
        <h2>{user ? "I am logged in" : "I am not logged in"}</h2>

        <Switch>
            <Route path="/search">
              <SearchList results={results} setResults={setResults} addCoffee={addCoffee}/>
            </Route>
          <Route path="/coffees" >
            <ReviewContext.Provider value={{addReview}}>
              <FavouriteContext.Provider value={{addFavourite, deleteFavourite}}>
                <Coffees />
              </FavouriteContext.Provider>
            </ReviewContext.Provider>
          </Route>
          <Route path="/login" >
            <Login/>
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
