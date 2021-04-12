import {React, useContext} from 'react';
import Fuse from 'fuse.js'
import {getReviewsForCoffee, avgRatingForCoffee} from '../../helpers/selectors';
import CoffeeListItem from '../coffees/CoffeeListItem';

import DataContext from '../../contexts/DataContext';
import AddCoffeeButton from '../add-coffee/AddCoffeeButton';


export default function SearchList(props) {
  
  const {state} = useContext(DataContext);
  const coffees = Object.values(state.coffees);
  const reviews = state.reviews;
  const {results, addCoffee} = props;
  const searchObject = results.textArray[0]

  const options = {
    isCaseSensitive: false,
    includeScore: true,
    shouldSort: true,
    includeMatches: false,
    findAllMatches: false,
    minMatchCharLength: 1,
    location: 0,
    threshold: 0.7,
    distance: 100,
    useExtendedSearch: false,
    ignoreLocation: false,
    ignoreFieldNorm: false,
    keys: [
      "name",
      "brand",
    ]
  };

  const fuse = new Fuse(coffees, options)

  const searchResult = () => { 
    if(searchObject){

      const strippedWords = ["coffee","decaf","organic","espresso","usda","roast","roasted"]
      const wordsToReplace= new RegExp("\\b"+strippedWords.join('|')+"\\b","gi")
      const string = searchObject.replace(/\n/g, " ").replace(/[.,\/#!$%\^&\*;°•':{}=\-_`~()]/g,"").replace(wordsToReplace, '').toLowerCase()


      console.log('stripped', string)
      const Results = fuse.search(string, {limit: 5}) 
    
      if (Results.length !== 0) { 
      return Results.map(coffee => {
        const coffeeReviews = getReviewsForCoffee(Object.values(reviews),coffee.item.id)
        const avgRating = avgRatingForCoffee(coffeeReviews);
        return (
          <>
          <CoffeeListItem
            key={coffee.item.id}
            coffee={coffee.item}
            avgRating={avgRating}
          />
          </>
        );
      })
      }
      return (
        <>
        <p>There were no matches!</p>
        </>
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
    <AddCoffeeButton url={results.url} addCoffee={addCoffee} />
  </div>
  )  
}