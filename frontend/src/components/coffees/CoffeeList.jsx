import {Route, Switch} from 'react-router-dom';
import {useContext} from 'react';

import CoffeeContext from '../../contexts/CoffeeContext';
import ReviewContext from '../../contexts/ReviewContext';
import CoffeeListItem from './CoffeeListItem';

import {getReviewsForCoffee, avgRatingForCoffee} from '../../helpers/selectors';

const CoffeeList = (props) => {
  const {coffees} = useContext(CoffeeContext);
  const {reviews} = useContext(ReviewContext);

  const coffeeList = coffees.map(coffee => {

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
         {/* {addCoffeeArray.map((coffee) => {
           return (
             <CoffeeListItem 
             key={coffee.id}
             coffee={coffee} 
             />
           )
         })} */}
        </Route>
      </Switch>
    </div>
  )
};

export default CoffeeList;