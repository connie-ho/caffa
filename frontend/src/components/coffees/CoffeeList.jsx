import {Route, Switch} from 'react-router-dom';
import {useContext,useState} from 'react';

import DataContext from '../../contexts/DataContext';
import CoffeeListItem from './CoffeeListItem';
import Pagination from './Pagination';

import {getReviewsForCoffee, avgRatingForCoffee} from '../../helpers/selectors';

// external styles
import { Grid } from "@material-ui/core";

const CoffeeList = (props) => {

  const {state} = useContext(DataContext);

  const coffees = Object.values(state.coffees);
  const reviews = state.reviews;

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
    <div>
      <Switch>
        <Route path="/coffees/:id">
        </Route>
        <Route path="/coffees">

          <Grid item container direction="row" >
            <Grid item xs={0} sm={2} />

            <Grid item xs={12} sm={8} >
              <h1>All Coffees</h1>
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
    </div>
  )
};

export default CoffeeList;