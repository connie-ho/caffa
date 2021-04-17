import { useEffect, useState} from 'react';
import {Route} from 'react-router-dom';
import CoffeeListItem from './coffees/CoffeeListItem.jsx';
import CoffeeList from './coffees/CoffeeList.jsx';
import { Grid } from "@material-ui/core";
import TopPicks from './coffees/TopPicks.jsx'
import HeroComponent from './home/HeroComponent.jsx'
import axios from 'axios';

const Home = (props) => {

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
  

  return (
    <div>
        <Route path="/coffees/:id">
          <CoffeeListItem />
        </Route>
        <Route path="/coffees">
          <CoffeeList />
        </Route>


        <Route path="/">
        <Grid container direction='column' >
          <HeroComponent />
          <Grid item xs={12}></Grid>
          <Grid item xs={12}></Grid>            
          <TopPicks homeCoffees={homeCoffees} setHomeCoffees={setHomeCoffees}/>
          </Grid>
        </Route>
        


    </div>
  )
};

export default Home;