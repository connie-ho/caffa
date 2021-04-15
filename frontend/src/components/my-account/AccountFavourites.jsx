import {useContext, useEffect, useState} from 'react';
import DataContext from '../../contexts/DataContext.js';
import CoffeeListItem from '../coffees/CoffeeListItem.jsx';
import {getReviewsForCoffee, avgRatingForCoffee, getUserFavourites} from '../../helpers/selectors';
import { Grid } from "@material-ui/core";
import axios from 'axios';

const AccountFavourites = (props) => {
  // const [favourites, setFavourites] = useState({});
  const {coffees} = props;
  console.log("ACC FAVES :", props)

  // useEffect(() => {
  //   axios
  //     .get("/api/coffees/popular")
  //     .then(res => {
  //       setFavourites(res.data)
  //     })
  //     .catch(err => {
  //       console.log(err.message)
  //     })
  // }, []);

  const {state} = useContext(DataContext);

  // const coffees = Object.values(favourites);
  const reviews = state.reviews;

  // Create Coffee List Item
    const coffeeList = coffees.map(coffee => {
    const coffeeReviews = getReviewsForCoffee(Object.values(reviews),coffee.id)
    const avgRating = avgRatingForCoffee(coffeeReviews);

    return (
      <Grid item xs={4}>
        <CoffeeListItem
          key={coffee.id}
          coffee={coffee}
          avgRating={avgRating}
        />
      </Grid>
    );
  })

  return (
    <Grid container>
        {coffeeList}
    </Grid>
  )
}

export default AccountFavourites;