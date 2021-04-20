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
    flexGrow: 2,
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
  reviewItemWrapper: {
    
  },
  reviewItemSection: {
    padding: '2rem 2rem 2rem',
  },
  reviewCard: {
    padding: '0rem 3rem',
  },
  content: {
    flexGrow: 1,
    minHeight: 'calc(100vh - 70px)',
    position: 'relative'
  },
  accountContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '50px',
    minHeight: '90vh',
  },
  media: {
    height: 275,
    width: 180,
    backgroundSize: 'contain'
    
  },
  settingsForm: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',

    [theme.breakpoints.up('md')]: {
    textAlign: 'center',
    marginRight: '100px',
  }

  },
  subtitle: {
    marginTop: '30px',
    marginBottom: '30px',
  }
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
          <Grid container className={classes.accountContent}>
            <AccountFavourites 
              classes={classes}
              limit={50}
            />
          </Grid>
        </Route>
        <Route path="/account/reviews">
          <Grid container className={classes.accountContent}>
            <AccountReviews
              classes={classes}
              user={user}
              coffee={coffees}
              openReviewForm={openReviewForm}
              setOpenReviewForm={setOpenReviewForm}
            />
          </Grid>
        </Route>
        <Route path="/account/settings">
          <Grid container className={classes.accountContent}>
            <AccountSettings
              editUserHandler={editUserHandler}
              classes={classes}
            />
          </Grid>
        </Route>
        <Route path="/account">
          <Grid container className={classes.accountContent} spacing={-10}>
          <AccountProfile classes={classes}/>
          <AccountFavourites
            user={user}
            limit={3}
            classes={classes}
          />
          <AccountReviews
            user={user}
            coffee={coffees}
            openReviewForm={openReviewForm}
            setOpenReviewForm={setOpenReviewForm}
            limit={3}
            classes={classes}
          />
          </Grid>
        </Route>
      </Switch>
      <Footer />
    </main>
      
    </div>
  );
}
