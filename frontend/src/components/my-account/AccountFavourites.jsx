import {useContext, useEffect, useState} from 'react';
import { Grid, Button } from "@material-ui/core";
import { getFavouritesForUser, userFavCoffees } from '../../helpers/selectors';
import DataContext from '../../contexts/DataContext.js';
import UserContext from '../../contexts/UserContext.js';
import CoffeeListItem from '../coffees/CoffeeListItem.jsx';
import {getFavouritesForUser, userFavCoffees} from '../../helpers/selectors';
import { Grid, Button } from "@material-ui/core";

export default function AccountFavourites(props) {
  const {state} = useContext(DataContext);
  const {user} = useContext(UserContext);
  const {classes, limit} = props;
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
      <Grid item xs={12} sm={8} md={6} lg={4} style={{padding:'1.5em 1.5em'}}>
        <CoffeeListItem
          key={coffee.id}
          coffee={coffee}
          />
      </Grid>
    );
  })
  
  return (
    <Grid container xs={12} style={{marginTop:'2rem'}}>
    <Grid container spacing={10}>
        {coffeeList}
      {!coffeeList.length && 
        <p>There are no favourites here!</p>
      }
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
