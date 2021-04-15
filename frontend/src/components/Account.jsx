import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import AccountDrawer from './my-account/account/AccountDrawer';
import AccountProfile from './my-account/account/AccountProfile';
// import UserContext from '../contexts/UserContext';


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
            direction="row"
            container
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

              <AccountProfile />
            
            
          </Grid>
        </Container>
      </Box>
    </>
  );
};