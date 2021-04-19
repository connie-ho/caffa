import { useState, useContext, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';
import ReviewListItem from '../coffee-id/ReviewListItem';
import DataContext from '../../contexts/DataContext';
import {getUserReviews} from '../../helpers/selectors';
import classes from '../coffee-id/Coffee.module.scss';


function AccountReviews(props) {
  const {coffee} = props;
  console.log("accountreview coffee: ", props)
  const {user} = useContext(UserContext);
  const {state} = useContext(DataContext);
  const reviews = state.reviews;
  const users = state.users;

  const [values, setValues] = useState({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
  })

  useEffect(()=>{
    setValues(prev => ({
      ...prev,
      id: user? user.id : '',
      first_name: user? user.first_name : '',
      last_name: user? user.last_name : '',
      email: user? user.email : '',
    }))
  },[user])


  const coffeeReviews = getUserReviews(Object.values(reviews), values.id).sort((a,b)=> {return new Date(b.created_at) - new Date(a.created_at)});

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
      <h1>Recently Reviewed</h1>
      {reviewList}
    </div>
  )
}

export default AccountReviews;
