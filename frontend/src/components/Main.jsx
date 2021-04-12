import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useEffect, useState} from 'react';

import Nav from './Nav';
import Login from './Login';
import Home from './Home';
import CoffeeList from './coffees/CoffeeList';
import SearchList from './image-search/SearchList';
import Coffees from './coffees/Coffees';
import UserContext from '../contexts/UserContext';
import FavouriteContext from '../contexts/FavouriteContext';
import Image from 'material-ui-image'
import ReviewContext from '../contexts/ReviewContext';
import SearchContext from '../contexts/SearchContext';
import HomeContext from '../contexts/HomeContext';

const Main = (props) => {

  const {addFavourite, addCoffee, deleteFavourite, user, setUser, loginHandler, logoutHandler, homeCoffees, setHomeCoffees, getMostFavouritedCoffees} = props;

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
              <SearchList results={results} addCoffee={addCoffee}/>
            </Route>
          <Route path="/coffees" >
            <FavouriteContext.Provider value={{addFavourite, deleteFavourite}}>
              <Coffees />
            </FavouriteContext.Provider>
          </Route>
          <Route path="/login" >
            <Login loginHandler={loginHandler}/>
          </Route>
          <Route path="/">
            <HomeContext.Provider homeCoffees={homeCoffees} >
              <Home 
                getMostFavouritedCoffees={getMostFavouritedCoffees}
                homeCoffees={homeCoffees}
              />
            </HomeContext.Provider>
          </Route>
        </Switch>
      </Router>
    </div>
  )
};

export default Main;
