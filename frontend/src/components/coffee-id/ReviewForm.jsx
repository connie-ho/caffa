import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Stars from './Stars';

const useStyles = makeStyles((theme)=>({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '1em',
    margin: 'auto 0',
    border: '0px solid',
    borderRadius: '1rem',
    minWidth: '500px',
    minHeight: '350px'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}));

export default function ReviewForm(props) {

  const classes = useStyles();

  const {
    coffee,
    rating,
    setRating,
    openReviewForm, 
    // setOpenReviewForm, 
    description,
    setDescription,
    handleStarClick,
    handleCloseReviewForm,
    handleSubmitReviewForm
  } = props;

  console.log("coffee name:", coffee)

  return (
    <div>
      <Dialog 
        classes={{paper: classes.paper}}
        open={openReviewForm} 
        onClose={handleCloseReviewForm} 
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
        You're rating {coffee.name} by {coffee.brand}
        </DialogTitle>
        <DialogContent
          classes={{root: classes.content}}
        >
          <Stars 
          rating={rating}
          setRating={setRating}
          handleStarClick={handleStarClick}
        />
          <TextField
            multiline={true}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
            id="description"
            name="description"
            label="Say a few words about this coffee"
            type="email"
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
