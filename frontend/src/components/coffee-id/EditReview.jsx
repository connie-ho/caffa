import React, {useState, useContext} from 'react';
import ReviewForm from './ReviewForm';
import ReviewContext from '../../contexts/ReviewContext';


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
      handleCloseReviewForm()
    })

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
      />
    </div>
  );
}
