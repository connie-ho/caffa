import {useContext, useEffect, useState} from 'react';
import DataContext from '../../contexts/DataContext.js';
import CoffeeListItem from '../coffees/CoffeeListItem.jsx';
import {getReviewsForCoffee, avgRatingForCoffee} from '../../helpers/selectors';
import { Grid } from "@material-ui/core";
import axios from 'axios';
import Typography from '@material-ui/core/Typography';

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
        <Typography variant='h1'>Top favorites</Typography>
      <Grid container spacing="4">
        {coffeeList}
      </Grid>
      </Grid>
    </Grid>
  )
}

export default Content;