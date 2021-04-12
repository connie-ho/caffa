import {React, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CoffeeModal from './AddCoffeeModal';

export default function AddCoffeeButton(props) {

  const {url} = props
  
  const [modalOpen, setModalOpen] = useState(false)

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const renderModal = (<CoffeeModal open={modalOpen} setOpen={setModalOpen} />)
  
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  
  const classes = useStyles();
  
  return (
    <div className ={classes.root}>
      <Button color="primary" onClick={handleModalOpen}>Can't find your coffee? click here to add it. </Button>
      {renderModal}
    </div>

  )
}
