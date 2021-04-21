import {useContext, useEffect, useState} from 'react';
import DataContext from '../../contexts/DataContext.js';
import UserContext from '../../contexts/UserContext.js';
import CoffeeListItem from '../coffees/CoffeeListItem.jsx';
import {getFavouritesForUser, userFavCoffees} from '../../helpers/selectors';
import { Grid, Button } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

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
  const favCoffees = Object.values(Faves).sort((a,b)=>{
    return new Date(b.created_at) - new Date(a.created_at);
  });

  const slicedFav = favCoffees.slice(0, limit)
  const userCoffees = userFavCoffees(slicedFav, coffees);

  

  // Create Coffee List Item
    const coffeeList = userCoffees.map(coffee => {

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
    <Grid container xs={12}>
      <Grid item xs={12} className={classes.titleContainer}>
        <Typography variant={`${titleSize}`} className={classes.header} gutterBottom>Recent Favourites</Typography>
          <Typography variant={`${subTitleSize}`} className={classes.subtitle} gutterBottom >Your own top picks from Caffa</Typography>
        <Grid item xs={12} sm={6} className={classes.SubTitle}>
        </Grid>
      {!coffeeList.length && 
        <p>There are no favourites here!</p>
      }
      </Grid>
    <Grid container spacing={10}>
        {coffeeList}
    </Grid>
    { limit ? 
        <Grid container xs={12} style={{ justifyContent: 'flex-start' }}>
        <Button className={classes.seeMoreBtn} href="/account/favourites" variant="contained" color="primary" disableElevation>
          SEE MORE
        </Button>
      </Grid> : null 
      }

    </Grid>
  )

}
