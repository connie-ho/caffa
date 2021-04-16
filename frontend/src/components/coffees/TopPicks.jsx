import {useContext, useEffect, useState} from 'react';
import DataContext from '../../contexts/DataContext.js';
import CoffeeListItem from './CoffeeListItem.jsx';
import {getReviewsForCoffee, avgRatingForCoffee} from '../../helpers/selectors';
import { Grid } from "@material-ui/core";
import axios from 'axios';
import CarouselTest from '../Carousel/CarouselTest.jsx';
import Typography from '@material-ui/core/Typography';


const TopPicks = (props) => {
  const {homeCoffees, setHomeCoffees} = props
  const {state} = useContext(DataContext);

  const coffees = Object.values(homeCoffees);
  const reviews = state.reviews;

  // Create Coffee List Item
    const coffeeList = coffees.map(coffee => {
    const coffeeReviews = getReviewsForCoffee(Object.values(reviews),coffee.id)
    const avgRating = avgRatingForCoffee(coffeeReviews);

    return (
      <Grid item xs={12} sm={6} lg={4}>
        <CoffeeListItem
          key={coffee.id}
          coffee={coffee}
          avgRating={avgRating}
        />
      </Grid>
    );
  })

  return (
    <Grid item container direction="row" >
      <Grid item xs={0} sm={2} />
      <Grid item xs={12} sm={8} fullWidth >
        <Typography variant='h2' gutterBottom>Top favorites</Typography>
        <Typography variant='h4'>Only the best of the best! Chosen by you.</Typography>
      {/* <Grid container spacing="4">
        {coffeeList}
      </Grid> */}
      <CarouselTest homeCoffees={homeCoffees} > </CarouselTest>
      <Grid item xs={0} sm={2} />
      </Grid>
    </Grid>
  )
}

export default TopPicks;