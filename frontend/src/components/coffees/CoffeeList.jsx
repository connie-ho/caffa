import {Route, Switch} from 'react-router-dom';
import {useContext,useState} from 'react';

import CoffeeContext from '../../contexts/CoffeeContext';
import ReviewContext from '../../contexts/ReviewContext';
import CoffeeListItem from './CoffeeListItem';
import Pagination from './Pagination';

import {getReviewsForCoffee, avgRatingForCoffee} from '../../helpers/selectors';

const CoffeeList = (props) => {
  const {coffees} = useContext(CoffeeContext);
  const {reviews} = useContext(ReviewContext);

  
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
    const coffeeReviews = getReviewsForCoffee(reviews,coffee.id)
    const avgRating = avgRatingForCoffee(coffeeReviews);

    return (
      <CoffeeListItem
        key={coffee.id}
        coffee={coffee}
        avgRating={avgRating}
      />
    );
  })
  // const addCoffeeArray = Object.keys(props.coffees).map( coffee => {
  //   return props.coffees[coffee]
  // })

  return (
    <div>
      <Switch>
        <Route path="/coffees/:id">
        </Route>
        <Route path="/coffees">
          <h1>All Coffees</h1>
          {coffeeList}
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