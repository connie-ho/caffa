import {useContext, useEffect, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import CoffeeListItem from './coffees/CoffeeListItem.jsx';
import CoffeeList from './coffees/CoffeeList.jsx';
import Carousel from './Carousel/CarouselSlide.jsx';
import {getReviewsForCoffee, avgRatingForCoffee} from '../helpers/selectors';
import { Grid } from "@material-ui/core";
import Content from './top-picks/Content.jsx'
import HeroComponent from './home/HeroComponent.jsx'

const Home = (props) => {
  

  return (
    <div>
        <Route path="/coffees/:id">
          <CoffeeListItem />
        </Route>
        <Route path="/coffees">
          <CoffeeList />
        </Route>


        <Route path="/">
        <Grid container direction='column' spacing={6}>
          <HeroComponent />
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>            
          <Content/>

          {/* <Carousel/> */}
          </Grid>
        </Route>
        


    </div>
  )
};

export default Home;