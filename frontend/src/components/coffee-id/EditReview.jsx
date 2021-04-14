import React, {useState, useContext, useParams} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Stars from './Stars';
import ReviewContext from '../../contexts/ReviewContext';
import UserContext from '../../contexts/UserContext';


export default function EditReview(props) {

  const {open, handleClose, handleClickOpen, id, coffee, review} = props;
  const {editReview, value, setValue} = useContext(ReviewContext);
  const [description, setDescription] = useState(review.description) 

  const submitHandler = (e)=>{
    e.preventDefault();
    editReview({
      id,
      coffee_id: coffee.id,
      description,
      rating: value
    })
    handleClose()

  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Your review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You're rating {coffee.name}
          </DialogContentText>
          <Stars 
            handleClickOpen={handleClickOpen}
            rating={review.rating}
        />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            name="description"
            label="Say a few words about this coffee"
            type="email"
            fullWidth
            value={review.description}
            onInput={e => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button 
          
            color="primary"   
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
