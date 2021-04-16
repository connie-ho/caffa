import {useContext, useEffect, useState} from 'react';
import DataContext from '../../contexts/DataContext.js';
import CoffeeListItem from './CoffeeListItem.jsx';
import {getReviewsForCoffee, avgRatingForCoffee} from '../../helpers/selectors';
import { Grid } from "@material-ui/core";
import axios from 'axios';
import CoffeeCarousel from '../home/Carousel/CoffeeCarousel.jsx';
import Typography from '@material-ui/core/Typography';


const TopPicks = (props) => {
  const {homeCoffees, setHomeCoffees} = props
  const {state} = useContext(DataContext);

  const coffees = Object.values(homeCoffees);
  const reviews = state.reviews;

  return (
    <Grid item container direction="row" >
      <Grid item xs={0} sm={2} />
      <Grid item xs={12} sm={8} fullWidth >
        <Typography variant='h2' gutterBottom>Top favorites</Typography>
        <Typography variant='h4'>Only the best of the best! Chosen by you.</Typography>
      <CoffeeCarousel homeCoffees={homeCoffees} type='favorite' > </CoffeeCarousel>
        <Typography variant='h2' gutterBottom>Top Reviewed</Typography>
        <Typography variant='h4'>The latest and greatest.</Typography>
      <CoffeeCarousel homeCoffees={homeCoffees} type='rating' > </CoffeeCarousel>
      </Grid>
      <Grid item xs={0} sm={2} />
    </Grid>
  )
}

export default TopPicks;