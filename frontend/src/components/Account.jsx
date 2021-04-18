import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import { Grid } from "@material-ui/core";
import { Helmet } from 'react-helmet';
import { useState, useContext, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import DataContext from '../contexts/DataContext';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SettingsIcon from '@material-ui/icons/Settings';
import RateReviewIcon from '@material-ui/icons/RateReview';

import AccountProfile from './my-account/AccountProfile';
import AccountSettings from './my-account/AccountSettings';
import AccountFavourites from './my-account/AccountFavourites';
import AccountReviews from './my-account/AccountReviews';
import {getUserReviews, isLiked, isReviewed} from '../helpers/selectors';
import { flexbox } from '@material-ui/system';
import Footer from './Footer'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
    height: '100%'
  },
}));

export default function Account(props) {
  const {editUserHandler} = props
  const classes = useStyles();
  const {state} = useContext(DataContext);
  const {user} = useContext(UserContext);
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
  
  const coffees = state.coffees;
  const reviews = state.reviews;
  console.log("STATE IN ACCOUNT :", state)
  console.log("USER CONTEXT :", user);
  // console.log("USER ID :", userId);


  const coffee = coffees[reviews.user_id]


  // filter for coffee reviews & favourites
  const coffeeReviews = getUserReviews(Object.values(reviews), values.id);

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }
  

  return (
    
    <div className={classes.root}>
      <Helmet>
        <title>Account | Caffa</title>
      </Helmet>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>

              <ListItemLink href="/account">
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={"My Account"} />
              </ListItemLink>

              <ListItemLink href="/account/favourites">
                <ListItemIcon>
                  <FavoriteIcon />
                </ListItemIcon>
                <ListItemText primary={"Favourites"} />
              </ListItemLink>

              <ListItemLink href="/account/reviews">
                <ListItemIcon>
                  <RateReviewIcon />
                </ListItemIcon>
                <ListItemText primary={"Reviews"} />
              </ListItemLink>

              <ListItemLink href="/account/settings">
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary={"Settings"} />
              </ListItemLink>

          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Switch>
        <Route path="/account/favourites">
          <AccountFavourites 
            limit={0}
            className={classes.content}
          />
        </Route>
        <Route path="/account/reviews">
          <AccountReviews
            user={user}
            coffee={coffees}
            openReviewForm={openReviewForm}
            setOpenReviewForm={setOpenReviewForm}
          />
        </Route>
        <Route path="/account/settings">
          <AccountSettings
            classes={classes}
          />
        </Route>
        <Route path="/account">
          <AccountProfile />
          <AccountFavourites
            limit={3}
          />
        </Route>
      </Switch>
      <Footer />
    </main>
      
    </div>
  );
}
