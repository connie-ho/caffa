import React, {useState, useContext, useParams} from 'react';
import ReviewForm from './ReviewForm';
import Stars from './Stars';
import ReviewContext from '../../contexts/ReviewContext';
import UserContext from '../../contexts/UserContext';

// from material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function EditReview(props) {

  const {
    openReviewForm, 
    setOpenReviewForm, 
    handleCloseReviewForm, 
    handleClickOpenReviewForm, 
    coffee, 
    review} = props;

  const {editReview} = useContext(ReviewContext);
  const [description, setDescription] = useState(review.description) 
  const [rating, setRating] = useState(review.rating)

  const handleEditReview = (e)=>{
    e.preventDefault();
    editReview({
      id: review.id,
      description,
      rating
    }).then(()=>{
      console.log('editing')
      handleCloseReviewForm()
    })

  }

  const handleStarClick = () => {
    setRating()
  }

  return (
    <div>
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
        handleSubmitReviewForm={handleEditReview}
        handleStarClick={handleStarClick}
      />
    </div>
  );
}
