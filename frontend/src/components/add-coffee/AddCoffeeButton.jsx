import {React, useState, useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CoffeeModal from './AddCoffeeModal';
import UserContext from '../../contexts/UserContext';


export default function AddCoffeeButton(props) {

  const {url, addCoffee} = props
  const {user, setOpenLogin} = useContext(UserContext);
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
      paddingLeft:'15px',
      margin:'1em 1em'
    }
  }));
  
  const classes = useStyles();
  
  return (
    <>
      <Button variant="outlined" color="primary" disableRipple size="medium" style={{ fontSize: '1.25em' }} className={classes.button} onClick={handleModalOpen}>Can't find your coffee? click here to add it. </Button>
      {renderModal}
    </>
  )
}
