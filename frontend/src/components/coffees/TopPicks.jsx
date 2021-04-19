import {useContext, useEffect, useState} from 'react';
import DataContext from '../../contexts/DataContext.js';

import CoffeeListItem from './CoffeeListItem.jsx';
import {getReviewsForCoffee, avgRatingForCoffee} from '../../helpers/selectors';
import { Grid } from "@material-ui/core";
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import CoffeeCarousel from '../home/Carousel/CoffeeCarousel.jsx';
import EditorPick from '../home/EditorsPicks'
import Aos from "aos";
import "aos/dist/aos.css"

const kevinDescription = "Not too bitter, not too light. I've found my new go-to everyday coffee."

const justinDescription ="Keep it simple, like I always say!"

const connieDescription ="Super versatile and quick to make. Enjoy it as  vietnamese coffee, or whip it with sugar to make dalgona coffee"

const TopPicks = (props) => {

  useEffect(() => {
    Aos.init({})
  },[]);

  const {homeCoffees, setHomeCoffees} = props
  const {state} = useContext(DataContext);

  const coffees = Object.values(state.coffees);
  const reviews = state.reviews;

  return (
    <Grid container direction="row" >
      <Grid item xs={0} sm={1} />
      <Grid item xs={12} sm={10} fullWidth >

        <div data-aos="fade"  data-aos-once="true">
          <Typography variant='h2' gutterBottom>Top Favorites</Typography>
          <Typography variant='h4'>Only the best of the best! Chosen by you.</Typography>
          <CoffeeCarousel homeCoffees={homeCoffees} type='favorite' > </CoffeeCarousel>
        </div>
        <div data-aos="fade"  data-aos-once="true">
          <Grid container direction='column'>
            <Typography variant='h2' gutterBottom>Editor Picks</Typography>
            <Typography variant='h4'gutterBottom>What gets us up in the mornings.</Typography>
            <Grid container direction="row">
              <Grid item xs={12} sm={6} lg={4}>
                <EditorPick userid={2} description={connieDescription} number={15} img='https://avatars.githubusercontent.com/u/66891817?v=4' />
              </Grid>
              <Grid item xs={12} sm={6} lg={4} >
                <EditorPick userid={3} number={16} description={justinDescription} img='https://avatars.githubusercontent.com/u/73570663?v=4'/>
              </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <EditorPick userid={1} number={17} description={kevinDescription} img='https://avatars.githubusercontent.com/u/31554101?v=4'/>
                </Grid>
            </Grid>
          </Grid>
      </div>
        <div data-aos="fade" data-aos-offset="650"  data-aos-once="true">
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