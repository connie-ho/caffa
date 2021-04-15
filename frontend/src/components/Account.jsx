import { Helmet } from 'react-helmet';
import {Route, Switch} from 'react-router-dom';
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

  return (
    <>
      <Helmet>
        <title>Account | Caffa</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <AccountDrawer />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
            </Grid>
            
          </Grid>
        </Container>
      </Box>

      <Switch>
        <Route path="/favourites">
          <AccountFavourites />
        </Route>
        <Route path="/settings">
          <AccountSettings />
        </Route>
      </Switch>
    </>
  );
};