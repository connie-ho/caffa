import {useContext} from 'react';
import ReviewListItem from '../coffee-id/ReviewListItem';
import DataContext from '../../contexts/DataContext';
import {getUserReviews} from '../../helpers/selectors';
import classes from '../coffee-id/Coffee.module.scss';


function AccountReviews(props) {
  const {coffee} = props;
  console.log("accountreview coffee: ", props)
  const {state} = useContext(DataContext);
  const reviews = state.reviews;
  const users = state.users;


  const coffeeReviews = getUserReviews(Object.values(reviews), 1).sort((a,b)=> {return new Date(b.created_at) - new Date(a.created_at)});

  console.log("coffee reviews :", coffeeReviews)

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

  // console.log("review id: ", review.id, "review :", review, "reviewUser :", users[review.user_id], "coffee :", coffee)

  return (
    <div className={classes['coffee-review-list']}>
      <h1>REVIEW LIST</h1>
      {reviewList}
    </div>
  )
}

export default AccountReviews;
