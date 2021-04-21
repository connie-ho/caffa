import React, {useContext} from 'react';
import UserContext from '../contexts/UserContext';
import {Link, NavLink} from 'react-router-dom';
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
import FormDialog from './image-search/ImageSearchModal';
import SearchBar from './dynamic-search/SearchBar';
import headIcon from "../images/Caffa2.png"
import Paper from '@material-ui/core/Paper'
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    padding: '0.5rem 0.5rem',
    maxWidth: '100%',
    zIndex: theme.zIndex.drawer + 1,
    alignItems: 'center'
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      marginLeft:20
    },
  },
  allCoffee: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      marginLeft:0,
      marginRight:'2em'
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(1),
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
  imageIcon: {
    marginRight:'1.5em',

    [theme.breakpoints.up('md')]: {
      marginRight:'3em',
    }
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
      marginLeft:'1.5em'
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  mobileMenu: {
    marginRight: theme.spacing(1)
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

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
    setMobileMoreAnchorEl(null)
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
        { user &&
        <MenuItem onClick={handleMenuClose}>
          <Link to="/account">My Account</Link>
        </MenuItem>
        }
        { user &&
        <MenuItem onClick={handleMenuClose}>
          <Link to="/account/favourites">Favourited Coffee</Link> 
        </MenuItem>
        }
        { user &&
        <MenuItem onClick={handleMenuClose}>
          <Link to="/account/reviews">Reviewed Coffee</Link> 
        </MenuItem>
        }
        { user &&
        <MenuItem onClick={handleMenuClose}>
          <Link to="/account/settings">Settings</Link> 
        </MenuItem>
        }
        <MenuItem onClick={handleMenuClose}>
          {user ? <Link onClick={logoutHandler}>Logout</Link> : <Link to="/login">Login</Link>}
        </MenuItem>
      </Menu>
  );
  
  const renderModal = (<FormDialog open={modalOpen} setOpen ={setModalOpen} />)

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      className={classes.mobileMenu}
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
      <MenuItem onClick={handleModalOpen} >
        <IconButton
          aria-label="image-search"
          aria-controls="image-search"
          aria-haspopup="true"
          color="inherit"
        >
          <CameraAltIcon />
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <IconButton
          aria-label="all-coffeescoffees"
          aria-controls="all-coffees"
          aria-haspopup="true"
          color="inherit"
        >
        <NavLink to="/coffees">
          <FreeBreakfastIcon/> </NavLink>
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>

      <AppBar elevation={2} position="fixed" className={classes.appBar} style={{background: '#FFFFFF'}}>

        <Toolbar>
          <Link to="/" className={classes.imageIcon} style={{width:'50px'}}>
            <Icon
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              size='small'
              >

              <img src={headIcon} width="60" height="50" alt="caffa" /> 
            </Icon>
          </Link>
          <Link to="/coffees">
            <Typography className={classes.allCoffee} variant="body2" noWrap>
              COFFEES
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

            { user &&

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
               <AccountCircle /> 
              </IconButton>
               }
           
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
            null
          :
          <Link to="/login">
            <Typography className={classes.title} variant="body2" noWrap>
              LOGIN
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
