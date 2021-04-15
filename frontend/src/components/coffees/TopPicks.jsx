import {useContext, useEffect, useState} from 'react';
import DataContext from '../../contexts/DataContext.js';
import CoffeeListItem from './CoffeeListItem.jsx';
import {getReviewsForCoffee, avgRatingForCoffee} from '../../helpers/selectors';
import { Grid } from "@material-ui/core";
import axios from 'axios';

const TopPicks = () => {
  const [homeCoffees, setHomeCoffees] = useState({});

  useEffect(() => {
    axios
      .get("/api/coffees/popular")
      .then(res => {
        setHomeCoffees(res.data)
      })
      .catch(err => {
        console.log(err.message)
      })
  }, []);

  const {state} = useContext(DataContext);

  const coffees = Object.values(homeCoffees);
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

export default TopPicks;