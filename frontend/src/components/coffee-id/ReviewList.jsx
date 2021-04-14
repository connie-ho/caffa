import ReviewListItem from './ReviewListItem';
import {useContext} from 'react';
import DataContext from '../../contexts/DataContext';
import {getReviewsForCoffee} from '../../helpers/selectors';

function ReviewList(props) {
  const {coffee} = props;
  const {state} = useContext(DataContext);
  const reviews = state.reviews;
  const users = state.users;
  const coffeeReviews = getReviewsForCoffee(Object.values(reviews), coffee.id).sort((a,b)=> {return new Date(b.created_at) - new Date(a.created_at)});

  // Create Review List Item
  const reviewList = coffeeReviews.map(review => {
    return (
      <ReviewListItem 
        key={review.id}
        review={review}
        reviewUser={users[review.user_id]}
        coffee={coffee}
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
