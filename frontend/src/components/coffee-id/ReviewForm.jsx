import React, {useState, useContext, useParams} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Stars from './Stars';

export default function ReviewForm(props) {


  const {
    coffee,
    rating,
    setRating,
    openReviewForm, 
    setOpenReviewForm, 
    description,
    setDescription,
    handleStarClick,
    handleCloseReviewForm,
    handleSubmitReviewForm
  } = props;

  console.log("coffee name:", coffee)

  return (
    <div>
      <Dialog open={openReviewForm} onClose={handleCloseReviewForm} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Your review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You're rating {coffee.name}
          </DialogContentText>
          <Stars 
          rating={rating}
          setRating={setRating}
          handleStarClick={handleStarClick}
        />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            name="description"
            label="Say a few words about this coffee"
            type="email"
            fullWidth
            value={description}
            onInput={e => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseReviewForm} color="primary">
            Cancel
          </Button>
          <Button 
            variant="outlined"
            onClick={handleSubmitReviewForm} 
            color="primary"   
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
