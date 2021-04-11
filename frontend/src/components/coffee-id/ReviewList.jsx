import ReviewListItem from './ReviewListItem';
import {useContext} from 'react';
import DataContext from '../../contexts/DataContext';
import {getReviewsForCoffee} from '../../helpers/selectors';

function ReviewList({coffeeId}) {
  
  const {state} = useContext(DataContext);
  const reviews = state.reviews;
  const coffeeReviews = getReviewsForCoffee(Object.values(reviews), coffeeId);
  

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
