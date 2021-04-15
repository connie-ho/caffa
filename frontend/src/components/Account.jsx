import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';
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
import AccountFavourites from './my-account/AccountSettings';

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
  const {user} = useContext(UserContext);
  const [view, setView] = useState(AccountProfile);
  const classes = useStyles();

  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }
  
  const handleAccountClick = () => {
    console.log("Account Clicked")
    setView(AccountProfile)
  }
  
  const handleFavouritesClick = () => {
    setView(AccountFavourites)
  }
  
  const handleSettingsClick = () => {
    setView(AccountSettings)
  }
  
  console.log("USER CONTEXT :", user);


  return (
    

    <div className={classes.root}>
      <Helmet>
        <title>Account | Caffa</title>
      </Helmet>
      <CssBaseline />
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

              <ListItemLink onClick={handleAccountClick}>
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
        <Route>
          <AccountProfile />
        </Route>
        <Route>
          <AccountFavourites />
        </Route>
        <Route>
          <AccountSettings />
        </Route>
      </Switch>
      <main className={classes.content}>
        <Toolbar />
      </main>
    </div>
  );
}
