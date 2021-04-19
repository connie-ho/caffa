import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {useState, useContext} from 'react';
import { Grid } from "@material-ui/core";
import Nav from './Nav';
import Login from './Login';
import Home from './Home';
import SearchList from './image-search/SearchList';
import Coffees from './coffees/Coffees';
import DataContext from '../contexts/DataContext';
import FavouriteContext from '../contexts/FavouriteContext';
import ReviewContext from '../contexts/ReviewContext';
import SearchContext from '../contexts/SearchContext';
import HomeContext from '../contexts/HomeContext';
import Account from './Account';
import AccountFavourites from './my-account/AccountFavourites';
import AccountSettings from './my-account/AccountSettings';
import Register from './Register'
import Footer from './Footer'
const Main = (props) => {

  const {
    addFavourite, 
    deleteFavourite, 
    addReview,
    editReview,
    deleteReview, 
    addCoffee, 
    user, 
    setUser, 
    editUserHandler,
    loginHandler, 
    logoutHandler, 
    homeCoffees, 
    setHomeCoffees,
     } = props;

  const [results, setResults] = useState(
    {
      url:'',
      textArray: [],
      
    }
  )


  return (
    <Grid container direction="column" style={{position:'relative'}}>
      <SearchContext.Provider value={{results, setResults}}>
        <Grid item>
          <Nav 
            logoutHandler={logoutHandler} 
            user={user}
          />
        </Grid>
      </SearchContext.Provider >
        {/* <h2>{user ? "I am logged in" : "I am not logged in"}</h2> */}

        <Switch>
          <Route path="/account">
          <ReviewContext.Provider value={{addReview, editReview, deleteReview}}>

            <Account 
              editUserHandler={editUserHandler}
            />
            </ReviewContext.Provider>

          </Route>
          <>
            <Route path="/search">
            <Grid item style={{minHeight:'80vh'}}>
              <SearchList results={results} setResults={setResults} addCoffee={addCoffee}/>
            </Grid>
            </Route>
          <Route path="/coffees" >
            <ReviewContext.Provider value={{addReview, editReview, deleteReview}}>
              <FavouriteContext.Provider value={{addFavourite, deleteFavourite}}>
                <Coffees />
              </FavouriteContext.Provider>
            </ReviewContext.Provider>
          </Route>
          <Route path="/login" >
            <Login/>
          </Route>
          <Route path="/register" >
            <Register />
          </Route>
          <Route path="/" exact>
            <HomeContext.Provider>
              <Home />
            </HomeContext.Provider>
          </Route>
          <Footer/>
          </>
        </Switch>
    </Grid>
  )
};

export default Main;
