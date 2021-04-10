import ReviewListItem from './ReviewListItem';
import {useContext} from 'react';
import ReviewContext from '../../contexts/ReviewContext';
import {getReviewsForCoffee} from '../../helpers/selectors';

function ReviewList({coffeeId}) {
  
  const {reviews} = useContext(ReviewContext);
  const coffeeReviews = getReviewsForCoffee(reviews, coffeeId)
  

  // Create Review List Item
  const reviewList = coffeeReviews.map(review => {
    return (
      <ReviewListItem 
        key={review.id}
        review={review}
      />
    );
  })


  return (
    <div>
      {reviewList}
    </div>
  )
}

export default ReviewList;
