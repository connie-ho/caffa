import { useState, useContext, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';
import ReviewListItem from '../coffee-id/ReviewListItem';
import DataContext from '../../contexts/DataContext';
import {getUserReviews} from '../../helpers/selectors';
import { Grid, Link, Button } from "@material-ui/core";



function AccountReviews(props) {
  const {coffee, classes, limit} = props;
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
  const slicedReviews = coffeeReviews.sort((a,b)=>{
    return new Date(b.created_at) - new Date(a.created_at);
  }).slice(0, limit);
  
  // Create Review List Item
  const reviewList = slicedReviews.map(review => {

    return (
      <Grid container className={classes.reviewItemSection}>
        <Grid item sm= {12} md={12} lg={2} style={{display:'flex', justifyContent:'center', width:'100%'}} >
        <Link href={`/coffees/${review.coffee_id}`}>
        <img 
          class={classes.media}
          style={{objectFit: 'cover'}}
          src={state.coffees[review.coffee_id].image_url}
          alt={`${coffee[review.id].name}`}
          />
        </Link>
        </Grid>
      <Grid item md={12} lg={10} className={classes.reviewCard}>
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
    <div>
      {reviewList}
      </div>
      { limit ? 
   
        <Button className={classes.seeMoreBtn} href="/account/reviews" variant="contained" color="primary" disableElevation>
          SEE MORE
        </Button> : null
      }
      </div>
  )
}

export default AccountReviews;
