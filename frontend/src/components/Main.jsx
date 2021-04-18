import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
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
import AccountProfile from './my-account/AccountProfile';
import AccountReviews from './my-account/AccountReviews';
import AccountDrawer from './my-account/AccountDrawer';
import Register from './Register'
import Footer from './Footer'
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '5rem 20rem',
    display: 'block',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


const Main = (props) => {

  const classes = useStyles();

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
    setHomeCoffees } = props;

  const [results, setResults] = useState(
    {
      url:'',
      textArray: [],
      
    }
  )

  const [openReviewForm, setOpenReviewForm] = useState(false);
  const [values, setValues] = useState({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
  })

  useEffect(()=>{
    setValues(prev => ({
      ...prev,
      id: user? user.id : '',
      first_name: user? user.first_name : '',
      last_name: user? user.last_name : '',
      email: user? user.email : '',
    }))
  },[user])
  

  const {state} = useContext(DataContext);
  const coffees = state.coffees;
  

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
        {/* <h2>{user ? "I am logged in" : "I am not logged in"}</h2> */}

        <Switch>
            <Route path="/search">
            <Grid item>
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

      <ReviewContext.Provider value={{addReview, editReview, deleteReview}}>
        <Route path="/account/favourites">
          <AccountDrawer />
          <AccountFavourites 
            limit={0}
          />
        </Route>
        <Route path="/account/reviews">
          <AccountDrawer />
          <AccountReviews
            user={user}
            coffee={coffees}
            openReviewForm={openReviewForm}
            setOpenReviewForm={setOpenReviewForm}
          />
        </Route>
        <Route path="/account/settings">
          <AccountDrawer />
          <AccountSettings
            classes={classes}
          />
        </Route>
        <Route path="/account" exact>
          <AccountDrawer />
          <AccountProfile />
          <AccountFavourites
            limit={3}
          />
        </Route>
        </ReviewContext.Provider>

          <Route path="/login" >
            <Login/>
          </Route>
          <Route path="/register" >
            <Register />
          </Route>
          <Route path="/">
            <HomeContext.Provider>
              <Home />
            </HomeContext.Provider>
          </Route>
        </Switch>
      </Router>
        <Footer/>
    </Grid>
  )
};

export default Main;
