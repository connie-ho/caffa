import {useContext, useEffect, useState} from 'react';
import DataContext from '../../contexts/DataContext.js';
import CoffeeListItem from '../coffees/CoffeeListItem.jsx';
import {getReviewsForCoffee, avgRatingForCoffee, getUserFavourites} from '../../helpers/selectors';
import { Grid, GridListTile } from "@material-ui/core";
import axios from 'axios';

export default function AccountFavourites(props) {
  const [favourites, setFavourites] = useState({});
  // const {coffees} = props;
  // console.log("ACC FAVES :", props)

  
  useEffect(() => {
    axios
    .get("/api/coffees/popular")
    .then(res => {
      setFavourites(res.data)
    })
    .catch(err => {
      console.log(err.message)
    })
  }, []);
  
  const {limit, className} = props;
  console.log("LIMIT :", props)
  console.log("FAVOURITES :", favourites)

  // some function that allows you to slice the favourites arr
  
  // console.log("SLICED FAV :", slicedFav)
  
  const {state} = useContext(DataContext);
  
  const coffees = Object.values(favourites);
  const reviews = state.reviews;
  const slicedFav = coffees.slice(limit) // what is the slice arguments???

  
  console.log("slicedFav", slicedFav)

  // Create Coffee List Item
  // pass in slicedFav instead of coffees
    const coffeeList = slicedFav.map(coffee => {
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
    <Grid container direction='column'>
      <h1>My Favourites</h1>
      <Grid container direction='row'>
        {coffeeList}
      </Grid>
    {/* {render see more button if limit does not equal 0} */}
    </Grid>
  )

}
