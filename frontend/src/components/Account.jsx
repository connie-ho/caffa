import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
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
import AccountProfile from './my-account/AccountProfile';
import AccountSettings from './my-account/AccountSettings';
import AccountFavourites from './my-account/AccountFavourites';

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
    padding: theme.spacing(3),
  },
}));

export default function Account(props) {
  const classes = useStyles();
  const {state} = useContext(DataContext);
  const {user} = useContext(UserContext);

  console.log("STATE IN ACCOUNT :", state)
  console.log("USER CONTEXT :", user);


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

              <ListItemLink href="/account/settings">
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary={"Settings"} />
              </ListItemLink>

          </List>
        </div>
      </Drawer>
      
        <Switch>
        <Route path="/account/favourites">
          <AccountFavourites 
            limit={0}
          />
        </Route>
        <Route path="/account/settings">
          <AccountSettings />
        </Route>
        <Route path="/account">
          <AccountProfile />
          <AccountFavourites
            limit={3}
          />
        </Route>
      </Switch>
      <main className={classes.content}>
        <Toolbar />
        <h2>Account Toolbar</h2>
      </main>
    </div>
  );
}
