import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useEffect, useState} from 'react';
import { Grid } from "@material-ui/core";
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
import HomeContext from '../contexts/HomeContext';

const Main = (props) => {

  const {addFavourite, deleteFavourite, addReview, addCoffee, user, setUser, loginHandler, logoutHandler, homeCoffees, setHomeCoffees, getMostFavouritedCoffees} = props;

  const [results, setResults] = useState(
    {
      url:'',
      textArray: [],
      
    }
  )
  

  return (
    <Grid container direction="column">
      <Router>
      <SearchContext.Provider value={{results, setResults}}>
        <Grid item>
          <Nav 
            logoutHandler={logoutHandler} 
            user={user}
          />
        </Grid>
      </SearchContext.Provider >
        <h2>{user ? "I am logged in" : "I am not logged in"}</h2>

        <Switch>
            <Route path="/search">
            <Grid item>
              <SearchList results={results} setResults={setResults} addCoffee={addCoffee}/>
            </Grid>
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
            <HomeContext.Provider homeCoffees={homeCoffees} >
              <Home 
                getMostFavouritedCoffees={getMostFavouritedCoffees}
              />
            </HomeContext.Provider>
          </Route>
        </Switch>
      </Router>
    </Grid>
  )
};

export default Main;
