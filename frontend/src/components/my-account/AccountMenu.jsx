import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import RateReviewIcon from "@material-ui/icons/RateReview";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SettingsIcon from "@material-ui/icons/Settings";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    position: "fixed",
    left: 0,
    height: "2%",
    width: "1%",
    transform: `translate(0px, 30vh)`,
    display: "flex",
    margin: "1rem 0",
    [theme.breakpoints.up("sm")]: {
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    fontSize: "1rem",
    margin: "0 auto",
    color: theme.palette.text.secondary,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  listItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.5rem",
  },
  icon: {
    marginRight: "0.5rem",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    boxSizing: "border-box",
    padding: "1.5rem",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function AccountMenu(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        <Link to="/account">
          <ListItem className={classes.listItem}>
            <AccountCircleIcon className={classes.icon} />
            <ListItemText primary={"My Account"} />
          </ListItem>
        </Link>

        <Link to="/account/favourites">
          <ListItem className={classes.listItem}>
            <FavoriteIcon className={classes.icon} />
            <ListItemText primary={"My Favourites"} />
          </ListItem>
        </Link>

        <Link to="/account/reviews">
          <ListItem className={classes.listItem}>
            <RateReviewIcon className={classes.icon} />
            <ListItemText primary={"My Reviews"} />
          </ListItem>
        </Link>

        <Link to="/account/settings">
          <ListItem className={classes.listItem}>
            <SettingsIcon className={classes.icon} />
            <ListItemText primary={"My Settings"} />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.appBar}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

AccountMenu.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default AccountMenu;
