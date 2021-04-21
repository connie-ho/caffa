import * as React from 'react';
import {Route, Switch} from 'react-router-dom';
import { Grid } from "@material-ui/core";
import { Helmet } from 'react-helmet';
import { useState, useContext, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import DataContext from '../contexts/DataContext';
import { makeStyles } from '@material-ui/core/styles';


import AccountMenu from './my-account/AccountMenu';
import AccountProfile from './my-account/AccountProfile';
import AccountSettings from './my-account/AccountSettings';
import AccountFavourites from './my-account/AccountFavourites';
import AccountReviews from './my-account/AccountReviews';
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
    paddingTop: '30px',
  },
  drawerContainer: {
    overflow: 'auto',
  },
  reviewItemSection: {
    padding: '2rem 2rem 2rem',
    alignItems: 'center',
  },
  reviewCard: {
    padding: '0rem 3rem',
  },
  reviewCardActionArea: {
    padding: '0rem 3rem',
  },
  content: {
    flexGrow: 1,
    minHeight: 'calc(100vh - 70px)',
    // position: 'relative'
  },
  accountContent: {
    flexDirection: 'column',
    padding: '70px 50px 50px 50px',
    minHeight: '90vh',
  },
  media: {
    height: 275,
    width: 180,
    backgroundSize: 'contain'
    
  },
  avatarSettings: {
    height: 150,
    width: 150,
    
  },
  settingsForm: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  secondTitle: {
    textAlign: 'center',
    fontVariant: 'h3',
  },
  titleContainer: {
    marginTop: '50px',
    marginBottom: '30px',
  },
  SubTitle: {
    margin: '10px',
  },
  seeMoreBtn: {
    justifyContent: 'center',
  },
  title: {
    fontSize: '4.0rem',
    margin: '0px 20px 0px 20px '
  },
  header: {
    fontSize: '2.5rem',
    margin: '0 0.5em'
  },
  subtitle: {
    fontSize: '1.5rem',
    margin: '0 1rem'
  },
  paragraph: {
    fontSize:'1.5rem',
    margin: '0px 16px 0px 16px'
  },
  titleContainer: {
    margin:'5rem 0rem 5rem 0rem'
  }
}));

export default function Account(props) {
  const {editUserHandler} = props
  const classes = useStyles();
  const titleSize = {h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h6', subtitle1: 'subtitle1'}
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


  return (
    
    <div className={classes.root}>
      <Helmet>
        <title>Account | Caffa</title>
      </Helmet>
        <AccountMenu />
      <main className={classes.content}>
        <Switch>
        <Route path="/account/favourites">
          <Grid container className={classes.accountContent}>
            <AccountFavourites 
              classes={classes}
              titleSize={titleSize.h2}
            />
          </Grid>
        </Route>
        <Route path="/account/reviews">
          <Grid container className={classes.accountContent}>
            <AccountReviews
              classes={classes}
              titleSize={titleSize.h2}
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
            titleSize={titleSize.h2}
            subTitleSize={titleSize.h4}
          />
          <AccountReviews
            user={user}
            coffee={coffees}
            openReviewForm={openReviewForm}
            setOpenReviewForm={setOpenReviewForm}
            limit={3}
            classes={classes}
            titleSize={titleSize.h2}
            subTitleSize={titleSize.h4}
          />
          </Grid>
        </Route>
      </Switch>
      <Footer />
    </main>
      
    </div>
  );
}
