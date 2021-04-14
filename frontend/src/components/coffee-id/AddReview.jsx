import React, {useState, useContext, useParams} from 'react';
import ReviewForm from './ReviewForm';
import Stars from './Stars';
import ReviewContext from '../../contexts/ReviewContext';
import UserContext from '../../contexts/UserContext';

// from material ui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



export default function AddReview(props) {

  const {coffee, openReviewForm, setOpenReviewForm} = props;

  const [rating, setRating] = useState(0)
  const [description, setDescription] = useState('') 
  const {addReview} = useContext(ReviewContext);


  // user logic
  const {user, openLogin, setOpenLogin} = useContext(UserContext);

  const handleClickOpenReviewForm = () => {

    if(!user){
      setOpenLogin(prev => true);
      return;
    }

    if(openReviewForm){
      setRating(prev => rating)
    } else {
      setOpenReviewForm(true);
    }
  };

  const handleCloseReviewForm = () => {
    setOpenReviewForm(false);
  };

  const handleAddReview = () => {
    addReview({
      rating,
      description,
      user_id: user.id,
      coffee_id: coffee.id
    })
    handleCloseReviewForm()
  }

  return (
    <div>
      <h1>How did you like this Coffee?</h1>
      <Stars 
        rating={rating}
        setRating={setRating}
        handleClickOpen={handleClickOpenReviewForm}
      />
      <ReviewForm
        coffee={coffee}
        rating={rating}
        setRating={setRating}
        openReviewForm={openReviewForm}
        setOpenReviewForm={setOpenReviewForm}
        description={description}
        setDescription={setDescription}
        handleClickOpenReviewForm={handleClickOpenReviewForm}
        handleCloseReviewForm={handleCloseReviewForm}
        handleSubmitReviewForm={handleAddReview}
      />
    </div>
  );
}
