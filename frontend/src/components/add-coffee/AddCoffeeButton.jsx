import {React, useState, useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CoffeeModal from './AddCoffeeModal';
import { useHistory } from "react-router-dom";
import UserContext from '../../contexts/UserContext';
import NotLoggedIn from '../NotLoggedIn';

export default function AddCoffeeButton(props) {

  let history = useHistory();
  const {url, addCoffee} = props
  const {user, openLogin, setOpenLogin} = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false)
  
  const handleModalOpen = () => {
    if (!user) {
      setOpenLogin(prev => true)
      return;
    }
    setModalOpen(true);

  };

  const renderModal = (<CoffeeModal open={modalOpen} setOpen={setModalOpen} url={url} addCoffee={addCoffee} />)
  
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      }
    },
    button: {
      paddingLeft:'0px',
      color:'black'
    }
  }));
  
  const classes = useStyles();
  
  return (
    <>
      <Button variant="outlined" color="primary" disableRipple size="large" style={{ fontSize: '1.5em' }} classNames={classes.button} onClick={handleModalOpen}>Can't find your coffee? click here to add it. </Button>
      {renderModal}
    </>
  )
}
