import {useContext, useEffect, useState} from 'react';
import DataContext from '../../contexts/DataContext.js';
import CoffeeListItem from './CoffeeListItem.jsx';
import {getReviewsForCoffee, avgRatingForCoffee} from '../../helpers/selectors';
import { Grid } from "@material-ui/core";
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import CoffeeCarousel from '../home/Carousel/CoffeeCarousel.jsx';
import Aos from "aos";
import "aos/dist/aos.css"

const TopPicks = (props) => {

  useEffect(() => {
    Aos.init({})
  },[]);

  const {homeCoffees, setHomeCoffees} = props
  const {state} = useContext(DataContext);

  const coffees = Object.values(homeCoffees);
  const reviews = state.reviews;

  return (
    <Grid container direction="row" >
      <Grid item xs={0} sm={1} />
      <Grid item xs={12} sm={10} fullWidth >
        <div data-aos="fade">
        <Typography variant='h2' gutterBottom>Top favorites</Typography>
        <Typography variant='h4'>Only the best of the best! Chosen by you.</Typography>
      <CoffeeCarousel homeCoffees={homeCoffees} type='favorite' > </CoffeeCarousel>
        </div>
        <div data-aos="fade" data-aos-offset="650">
        <Typography variant='h2' gutterBottom>Top Reviewed</Typography>
        <Typography variant='h4'>The latest and greatest.</Typography>
      <CoffeeCarousel homeCoffees={homeCoffees} type='rating' > </CoffeeCarousel>
        </div>
      </Grid>
      <Grid item xs={0} sm={1} />
    </Grid>
  )
}

export default TopPicks;