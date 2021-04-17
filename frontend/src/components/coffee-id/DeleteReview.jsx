import React, {useContext} from 'react';
import ReviewContext from '../../contexts/ReviewContext';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DeleteReview(props) {
 
  const {open, handleClose, handleClickOpen, id} = props;
  const {deleteReview} = useContext(ReviewContext)

  const submitHandler = (e) => {
    e.preventDefault()
    deleteReview(id);
    handleClose()
  }


  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this review?"}</DialogTitle>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button  variant="outlined" onClick={submitHandler} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
