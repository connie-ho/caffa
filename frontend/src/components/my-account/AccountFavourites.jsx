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
  const {limit} = props;
  const {classes, titleSize} = props;

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


  // const {coffees} = props;
  // console.log("ACC FAVES :", props)

  // useEffect(() => {
  //   axios
  //   .get(`/api/favourites/user/${userId}`)
  //   .then(res => {
  //     setFavourites(res.data)
  //   })
  //   .catch(err => {
  //     console.log(err.message)
  //   })
  // }, []);

  const favourites = Object.values(state.favourites);
  console.log("VALUES ID ===>", values.id)
  
  console.log("FAVOURITES :", favourites)

  // some function that allows you to slice the favourites arr
  
  // console.log("SLICED FAV :", slicedFav)
  
  // const {state} = useContext(DataContext);
  // console.log("USER ID ===>", user.id)
  
  const Faves = (getFavouritesForUser(favourites, values.id));
  const favCoffees = Object.values(Faves);

  console.log("FAV COFFEES :", favCoffees)

  const reviews = state.reviews;
  const slicedFav = favCoffees.slice(0, limit) // what is the slice arguments???

  console.log("slicedFav", slicedFav)

  const coffees = state.coffees;

  const userCoffees = userFavCoffees(slicedFav, coffees);

  

  // Create Coffee List Item
  // pass in slicedFav instead of coffees
    const coffeeList = userCoffees.map(coffee => {
    const coffeeReviews = getReviewsForCoffee(Object.values(reviews),coffee.id)
    const avgRating = avgRatingForCoffee(coffeeReviews);
    console.log("avgRating", avgRating)

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
      <Grid item xs={3} className={classes.subtitle}>
        <Typography variant={`${titleSize}`}>Favourites</Typography>
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
