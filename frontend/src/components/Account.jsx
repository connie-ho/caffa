import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { Helmet } from "react-helmet";
import { useState, useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";
import DataContext from "../contexts/DataContext";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import AccountMenu from "./my-account/AccountMenu";
import AccountSettings from "./my-account/AccountSettings";
import AccountFavourites from "./my-account/AccountFavourites";
import AccountReviews from "./my-account/AccountReviews";
import Footer from "./Footer";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 2,
    display: "flex",
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
    boxSizing: "border-box",
    paddingTop: "30px",
  },
  drawerContainer: {
    overflow: "auto",
  },
  reviewItemSection: {
    alignItems: "center",
    margin: "1rem 1rem 1rem",
  },
  reviewCard: {
    padding: "1rem 0rem",
    width: "100%",
  },
  reviewCardActionArea: {
    padding: "0rem 3rem",
  },
  content: {
    flexGrow: 1,
    minHeight: "calc(100vh - 70px)",
  },
  accountContent: {
    flexDirection: "column",
    padding: "70px 50px 50px 50px",
    minHeight: "90vh",
  },
  media: {
    height: 275,
    width: 180,
    backgroundSize: "contain",
  },
  avatarSettings: {
    height: 150,
    width: 150,
  },
  settingsForm: {
    flexDirection: "row",
    justifyContent: "center",
  },
  secondTitle: {
    textAlign: "center",
    fontVariant: "h3",
  },
  titleContainer: {
    marginTop: "5rem",
    marginBottom: "3rem",
  },
  SubTitle: {
    margin: "10px",
  },
  seeMoreBtn: {
    marginTop: "2rem",
    color: "#646264",
    backgroundColor: "white",
    border: "2px solid #DEBB63",
    borderRadius: "1rem",
    "&:hover": {
      border: "3px solid #DEBB63",
      backgroundColor: "#DEBB63",
      color: "white",
    },
  },
  header: {
    fontSize: "2.5rem",
  },
  subtitle: {
    fontSize: "1.5rem",
  },
  paragraph: {
    fontSize: "1.5rem",
    margin: "0px 16px 0px 16px",
  },
  mainTitle: {
    fontSize: "3rem",
  },
}));

export default function Account(props) {
  const { editUserHandler } = props;
  const classes = useStyles();
  const titleSize = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h6",
    subtitle1: "subtitle1",
  };
  const { state } = useContext(DataContext);
  const { user } = useContext(UserContext);
  const [openReviewForm, setOpenReviewForm] = useState(false);
  const [currUser, setCurrUser] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    setCurrUser((prev) => ({
      ...prev,
      id: user ? user.id : "",
      first_name: user ? user.first_name : "",
      last_name: user ? user.last_name : "",
      email: user ? user.email : "",
    }));
  }, [user]);

  const coffees = state.coffees;

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
              <Typography variant="h2" className={classes.header} gutterBottom>
                Favourites
              </Typography>
              <AccountFavourites classes={classes} titleSize={titleSize.h2} />
            </Grid>
          </Route>
          <Route path="/account/reviews">
            <Grid container className={classes.accountContent}>
              <Typography variant="h2" className={classes.header} gutterBottom>
                Reviews
              </Typography>
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
            <Grid container className={classes.accountContent}>
              <Typography variant="h2" className={classes.mainTitle}>
                My Caffa
              </Typography>
              <div className={classes.titleContainer}>
                <Typography
                  variant="h2"
                  className={classes.header}
                  gutterBottom
                >
                  Recent Favourites
                </Typography>
                <Typography
                  variant="h3"
                  className={classes.subtitle}
                  gutterBottom
                >
                  Your own top picks from Caffa
                </Typography>
              </div>
              <AccountFavourites
                user={user}
                limit={3}
                classes={classes}
                titleSize={titleSize.h2}
                subTitleSize={titleSize.h4}
              />
              <div className={classes.titleContainer}>
                <Typography
                  variant="h2"
                  className={classes.header}
                  gutterBottom
                >
                  Recent Reviews
                </Typography>
                <Typography
                  variant="h3"
                  className={classes.subtitle}
                  gutterBottom
                >
                  You left a review on these coffees
                </Typography>
              </div>
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
