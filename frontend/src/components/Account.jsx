import { Helmet } from 'react-helmet';
import {Route, Switch} from 'react-router-dom';
import { useState } from 'react';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import AccountDrawer from './my-account/AccountDrawer';
import AccountProfile from './my-account/AccountProfile';
import AccountSettings from './my-account/AccountSettings';
import AccountFavourites from './my-account/AccountSettings';


export default function Account() {
  const [page, setPage] = useState();

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