import {Route, Switch} from 'react-router-dom';
import {useState} from 'react';

import CoffeeListItem from './CoffeeListItem';
import Paginations from './Pagination';

// external styles
import { Grid } from "@material-ui/core";

const CoffeeList = (props) => {

  const {coffees} = props;

  // Pagination Logic
  const[currentPage, setCurrentPage] = useState(1);
  const[coffeesPerPage, setCoffeesPerPage] = useState(9);
  
  const indexOfLastCoffee = currentPage * coffeesPerPage;
  const indexOfFirstCoffee = indexOfLastCoffee - coffeesPerPage;
  const currentCoffees = coffees.slice(indexOfFirstCoffee, indexOfLastCoffee)
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  // Create Coffee List Item
  const coffeeList = currentCoffees.map(coffee => {

    return (
      <Grid item xs={12} sm={6} lg={4}>
        <CoffeeListItem
          key={coffee.id}
          coffee={coffee}
        />
      </Grid>
    );
  })

  return (

      <Switch>
        <Route path="/coffees/:id">
        </Route>
        <Route path="/coffees">

          <Grid item container direction="row" style={{marginTop: '4rem'}} >
            <Grid item xs={0} sm={1} />
            <Grid item xs={12} sm={10} >
              <Grid container spacing="4">
                {coffeeList}
                <Grid container xs={12} justify='center'>
                <Paginations
            page={currentPage}
            setPage={setCurrentPage}
            coffeesPerPage={coffeesPerPage}
            totalCoffees={coffees.length}
                />
              </Grid>
            </Grid>
            </Grid>
            <Grid item xs={0} sm={1} />
          </Grid>
        </Route>
      </Switch>

  ) 
};

export default CoffeeList;