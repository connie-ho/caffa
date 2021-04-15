import React, {useContext} from 'react';
import UserContext from '../contexts/UserContext';
import {Link} from 'react-router-dom';

import { fade, makeStyles } from '@material-ui/core/styles';
import { Icon } from "@material-ui/core"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import FormDialog from './image-search/Dialog';
import Login from './Login';
import SearchBar from './dynamic-search/SearchBar';

import headIcon from "../images/Caffa2.png"
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar
}));


export default function Nav(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [modalOpen, setModalOpen] = React.useState(false)
  const {user} = useContext(UserContext);

  const {logoutHandler} = props

  // console.log("In Nav Component: ", user)


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };



  const menuId = 'primary-search-account-menu';
  const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          { user ? <Link to="/account">My Account</Link> : null }
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          { user ? <Link to="/account">Favourited Coffee</Link> : null }
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          {user ? <Link onClick={logoutHandler}>Logout</Link> : <Link to="/login">Login</Link>}
        </MenuItem>
      </Menu>
  );
  
  const renderModal = (<FormDialog open={modalOpen} setOpen ={setModalOpen} />)

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleModalOpen}>
        <IconButton
          aria-label="image-search"
          aria-controls="image-search"
          aria-haspopup="true"
          color="inherit"
        >
          <CameraAltIcon />
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" style={{background: '#FFFFFF'}}>
        <Toolbar>
          <Link to="/">
            <Icon
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              size='small'
              >

              <img src={headIcon} width="60" height="50"  /> 
            </Icon>
          </Link>
          <Link to="/coffees">
            <Typography className={classes.title} variant="h6" noWrap>
              Coffees
            </Typography>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <SearchBar />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="camera"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleModalOpen}
              color="inherit"
            >
              <CameraAltIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              { user ? <AccountCircle /> : null }
            </IconButton>
           
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
          
          <div>
            {user ? 
          <Link to="/">
            <Typography className={classes.title} variant="h6" noWrap onClick={logoutHandler}>
              Logout
            </Typography>
          </Link>
          :
          <Link to="/login">
            <Typography className={classes.title} variant="h6" noWrap>
              Login
            </Typography>
          </Link>
            }
  
          </div>

        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderModal}
      <Paper>
        <div className={classes.toolbar} />
      </Paper>
    </div>
  );
}
