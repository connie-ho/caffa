import {useContext, useEffect, useState} from 'react';
import DataContext from '../../contexts/DataContext.js';
import UserContext from '../../contexts/UserContext.js';
import CoffeeListItem from '../coffees/CoffeeListItem.jsx';
import {getReviewsForCoffee, avgRatingForCoffee, getFavouritesForUser, userFavCoffees} from '../../helpers/selectors';
import { Grid, GridListTile } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import axios from 'axios';



export default function AccountFavourites(props) {
  // const [favourites, setFavourites] = useState({});
  const {state} = useContext(DataContext);
  const {user} = useContext(UserContext);
  const {classes, titleSize, subTitleSize, limit} = props;
  const reviews = state.reviews;
  const coffees = state.coffees;

  const [values, setValues] = useState({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
  })

  useEffect(()=>{
    setValues(prev => ({
      ...prev,
      id: user? user.id : '',
      first_name: user? user.first_name : '',
      last_name: user? user.last_name : '',
      email: user? user.email : '',
    }))
  },[user])

  const favourites = Object.values(state.favourites);
  const Faves = (getFavouritesForUser(favourites, values.id));
  const favCoffees = Object.values(Faves);

  const slicedFav = favCoffees.slice(0, limit)
  const userCoffees = userFavCoffees(slicedFav, coffees);

  

  // Create Coffee List Item
    const coffeeList = userCoffees.map(coffee => {
    const coffeeReviews = getReviewsForCoffee(Object.values(reviews),coffee.id)
    const avgRating = avgRatingForCoffee(coffeeReviews);

    return (
      <Grid item xs={4}>
        <CoffeeListItem
          key={coffee.id}
          coffee={coffee}
          />
      </Grid>
    );
  })
  
  return (
    <Grid container>
      <Grid item xs={6} className={classes.titleContainer}>
        <Typography variant={`${titleSize}`}>Recent Favourites</Typography>
        <Grid item xs={6} className={classes.SubTitle}>
          <Typography variant={`${subTitleSize}`} >Your own top picks from Caffa</Typography>
        </Grid>
      {!coffeeList.length && 
        <p>There are no favourites here!</p>
      }
      </Grid>
    <Grid container spacing={10}>
        {coffeeList}
    </Grid>
    {/* {render see more button if limit does not equal 0} */}
    </Grid>
  )

}
