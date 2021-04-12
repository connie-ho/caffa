import {React, useContext} from 'react';
import Fuse from 'fuse.js'
import {getReviewsForCoffee, avgRatingForCoffee} from '../../helpers/selectors';
import CoffeeListItem from '../coffees/CoffeeListItem';
import {stripSearchTerms} from './helpers.js'
import DataContext from '../../contexts/DataContext';
import AddCoffeeButton from '../add-coffee/AddCoffeeButton';


export default function SearchList(props) {
  
  const {state} = useContext(DataContext);
  const coffees = Object.values(state.coffees);
  const reviews = state.reviews;
  const {addCoffee} = props;

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

  const storedUrl = (localStorage.getItem("url") || '' )

  const fuse = new Fuse(coffees, options)

  const searchResult = () => { 

    
    const storedArray =(localStorage.getItem("textarray") || [])
    let searchTerm = ''
    if (storedArray) {
      searchTerm = storedArray[0]
    }

    if(searchTerm){

      const string = stripSearchTerms(searchTerm)

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

  return(
  <div>
    <h2>Your Search Results</h2>
    {searchResult()}
    {storedUrl && <AddCoffeeButton url={storedUrl} addCoffee={addCoffee} />}
  </div>
  )  
}