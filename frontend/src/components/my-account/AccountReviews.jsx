import { useState, useContext, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';
import ReviewListItem from '../coffee-id/ReviewListItem';
import DataContext from '../../contexts/DataContext';
import {getUserReviews, getReviewedCoffee, reviewsWithImages} from '../../helpers/selectors';
import Typography from '@material-ui/core/Typography';
import { Grid, GridListTile, Link } from "@material-ui/core";



function AccountReviews(props) {
  const {coffee, classes, titleSize, subTitleSize} = props;
  // console.log("accountreview coffee: ", props)
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

  const reviewedCoffees = getReviewedCoffee(coffeeReviews, Object.values(coffee))
  console.log("TEST HERE :", reviewedCoffees);

  console.log("coffee reviews :", Object.values(coffeeReviews))


  // Create Review List Item
  const reviewList = coffeeReviews.map(review => {

    return (
      <Grid container className={classes.reviewItemSection}>
        <Link href={`/coffees/${review.coffee_id}`}>
        <img 
          class={classes.media}
          src={state.coffees[review.coffee_id].image_url}
          alt={`${coffee[review.id].name}`}
          />
        </Link>
          {/* <h2>{coffee[review.id].name}</h2> */}
      <Grid item xs={8} className={classes.reviewCard}>
        <ReviewListItem 
        
        key={review.id}
        review={review}
        reviewUser={users[review.user_id]}
        coffee={state.coffees[review.coffee_id]}
        />
      </Grid>
      </Grid>
    );
  })


  return (
    <div>
    <Grid item xs={6} className={classes.titleContainer}>
      <Typography variant={`${titleSize}`}>Recent Reviews</Typography>
      <Grid item xs={6} className={classes.SubTitle}>
        <Typography variant={`${subTitleSize}`} >You left a review on these coffees</Typography>
      </Grid>
    </Grid>
    <div>
      {reviewList}
      </div>
      </div>
  )
}

export default AccountReviews;
