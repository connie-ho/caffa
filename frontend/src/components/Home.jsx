import {useContext, useEffect, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import CoffeeListItem from './coffees/CoffeeListItem.jsx';
import CoffeeList from './coffees/CoffeeList.jsx';
import Carousel from './Carousel/CarouselSlide.jsx';
import {getReviewsForCoffee, avgRatingForCoffee} from '../helpers/selectors';
import { Grid } from "@material-ui/core";
import Content from './top-picks/Content.jsx'


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
          <h1>Top Picks (Most Favourited)</h1>
          <Content/>
          {/* <Carousel/> */}
        </Route>


    </div>
  )
};

export default Home;