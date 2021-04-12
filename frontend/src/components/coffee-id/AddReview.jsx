import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Stars from './Stars';
import ReviewContext from '../../contexts/ReviewContext';


export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0)

  const handleClickOpen = (value) => {
    console.log('in click handler')
    console.log(value)
    if(open){
      setValue(value)
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ReviewContext.Provider value={{value, setValue}}>
    <div>
      <h1>How did you like this Coffee?</h1>
      <Stars 
        handleClickOpen={handleClickOpen}
      />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <Stars 
          handleClickOpen={handleClickOpen}
        />
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </ReviewContext.Provider>
  );
}
