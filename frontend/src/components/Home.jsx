import {useContext, useEffect, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import axios from 'axios';

import DataContext from '../contexts/DataContext.js';
import CoffeeListItem from './coffees/CoffeeListItem.jsx';
import {getReviewsForCoffee, avgRatingForCoffee} from '../helpers/selectors';

export default function Home(props) {
  const [homeCoffees, setHomeCoffees] = useState(null);

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

  console.log("homeCoffees in Home frontend", homeCoffees)

  const {state} = useContext(DataContext);

  const coffees = Object.values(homeCoffees);
  const reviews = state.reviews;

  // Create Coffee List Item
  const coffeeList = coffees.map(coffee => {
    const coffeeReviews = getReviewsForCoffee(Object.values(reviews),coffee.id)
    const avgRating = avgRatingForCoffee(coffeeReviews);

    return (
      <CoffeeListItem
        key={coffee.id}
        coffee={coffee}
        avgRating={avgRating}
      />
    );
  })

  return (
    <div>
        <Route path="/coffees/:id">
          <CoffeeListItem />
        </Route>
        <Route path="/coffees">
          <CoffeeListItem />
        </Route>

          <h1>Top Picks (Most Favourited)</h1>
            {coffeeList}

    </div>
  )
};

