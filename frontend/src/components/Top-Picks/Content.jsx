import {useContext, useEffect, useState} from 'react';
import {Route, Switch} from 'react-router-dom';

import DataContext from '../../contexts/DataContext.js';
import CoffeeCard from './CoffeeCard.jsx';
import {getReviewsForCoffee, avgRatingForCoffee} from '../../helpers/selectors';
import { Grid } from "@material-ui/core";
import axios from 'axios';

const Content = () => {
  const [homeCoffees, setHomeCoffees] = useState({});

  useEffect(() => {
    console.log("getMostFavourited in App.jsx")
    axios
      .get("/api/coffees/popular")
      .then(res => {
        setHomeCoffees(res.data)
      })
      .catch(err => {
        console.log(err.message)
      })
  }, []);

  // console.log("homeCoffees in Home frontend", typeof homeCoffees)
  

  const {state} = useContext(DataContext);

  const coffees = Object.values(homeCoffees);
  const reviews = state.reviews;

  // Create Coffee List Item
    const coffeeList = coffees.map(coffee => {
    const coffeeReviews = getReviewsForCoffee(Object.values(reviews),coffee.id)
    const avgRating = avgRatingForCoffee(coffeeReviews);

    return (
      <Grid item xs={4}>
        <CoffeeCard
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

export default Content;