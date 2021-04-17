import {Route, Switch} from 'react-router-dom';
import {useState} from 'react';

import CoffeeListItem from './CoffeeListItem';
import Pagination from './Pagination';

// external styles
import { Grid } from "@material-ui/core";

const CoffeeList = (props) => {

  const {coffees} = props;

  // Pagination Logic
  const[currentPage, setCurrentPage] = useState(1);
  const[coffeesPerPage, setCoffeesPerPage] = useState(6);
  
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

          <Grid item container direction="row" >
            <Grid item xs={0} sm={1} />
            <Grid item xs={12} sm={10} >
              <Grid container spacing="4">
                {coffeeList}
              </Grid>
            </Grid>
          </Grid>
          <Pagination 
            coffeesPerPage={coffeesPerPage}
            totalCoffees={coffees.length}
            paginate={paginate}
          />
        </Route>
      </Switch>

  )
};

export default CoffeeList;