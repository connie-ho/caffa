import {React, useContext} from 'react';
import Fuse from 'fuse.js'
import {getReviewsForCoffee, avgRatingForCoffee} from '../../helpers/selectors';
import CoffeeListItem from '../coffees/CoffeeListItem';

import DataContext from '../../contexts/DataContext';


export default function SearchList(props) {
  
  const {state} = useContext(DataContext);
  const coffees = Object.values(state.coffees);
  const reviews = state.reviews;
  const {results} = props;

  
  const options = {
    isCaseSensitive: false,
    includeScore: true,
    shouldSort: true,
    includeMatches: false,
    findAllMatches: false,
    minMatchCharLength: 1,
    location: 0,
    threshold: 0.6,
    distance: 100,
    useExtendedSearch: false,
    ignoreLocation: false,
    ignoreFieldNorm: false,
    keys: [
      "name",
      "brand"
    ]
  };

  const fuse = new Fuse(coffees, options)

  const searchResult = () => { 
    if(results.textArray[0]){
      const Results = fuse.search(results.textArray[0], {limit: 3})
      if (Results.length !== 0) { 
      return Results.map(coffee => {
        const coffeeReviews = getReviewsForCoffee(Object.values(reviews),coffee.item.id)
        const avgRating = avgRatingForCoffee(coffeeReviews);
        return (
          <CoffeeListItem
            key={coffee.item.id}
            coffee={coffee.item}
            avgRating={avgRating}
          />
        );
      })
      }
      return (
        <p>There were no matches!</p>
      )
    }
    return (
      <p>You haven't searched any coffees yet!</p>
    )
  }

  console.log('searches', searchResult())

  return(
  <div>
    <h2>Your Search Results</h2>
    {searchResult()}
  </div>
  )  
}