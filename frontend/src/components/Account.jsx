import { Helmet } from 'react-helmet';
import {Route, Switch} from 'react-router-dom';
import { useState, useContext } from 'react';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import AccountDrawer from './my-account/AccountDrawer';
import AccountProfile from './my-account/AccountProfile';
import AccountSettings from './my-account/AccountSettings';
import AccountFavourites from './my-account/AccountSettings';
import UserContext from '../contexts/UserContext';

export default function Account(props) {
  const [page, setPage] = useState();
  const {user} = useContext(UserContext);
  // const {user} = props;

  console.log("USER CONTEXT :", user)

  return (
    <>
      <Helmet>
        <title>Account | Caffa</title>
      </Helmet>
        <AccountDrawer />
      <Switch>
        <Route>
          <AccountFavourites />
        </Route>
        <Route>
          <AccountSettings />
        </Route>
      </Switch>

    </>
  );
};