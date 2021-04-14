import {React, useContext, useEffect, useState} from 'react';
import Fuse from 'fuse.js'
import {getReviewsForCoffee, avgRatingForCoffee} from '../../helpers/selectors';
import CoffeeListItem from '../coffees/CoffeeListItem';
import {stripSearchTerms} from './helpers.js'
import DataContext from '../../contexts/DataContext';
import AddCoffeeButton from '../add-coffee/AddCoffeeButton';
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

export default function SearchList(props) {
  
  const {state} = useContext(DataContext);
  const coffees = Object.values(state.coffees);
  const reviews = state.reviews;
  const {addCoffee, results} = props;
  const [storedUrl, setStoredURL] = useState('')
  const [storedArray, setStoredArray] = useState([])

  useEffect(() => {
    setStoredURL(localStorage.getItem("url") || '' )
    setStoredArray(localStorage.getItem("textarray") || [])
 
  },[results.url])


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

    let searchTerm = ''
    if (storedArray) {
      searchTerm = storedArray.toString()
    }

    if(searchTerm){

      const string = stripSearchTerms(searchTerm)
    
      console.log('stripped string', string)
      const Results = fuse.search(string, {limit: 5}) 
    
      if (Results.length !== 0) { 
      return Results.map(coffee => {
        const coffeeReviews = getReviewsForCoffee(Object.values(reviews),coffee.item.id)
        const avgRating = avgRatingForCoffee(coffeeReviews);
        return (
        <Grid item xs={12} sm={6} lg={4}>
          <CoffeeListItem
            key={coffee.item.id}
            coffee={coffee.item}
            avgRating={avgRating}
          />
        </Grid>
        );
      })
      }
      return (
        <>
        <Grid item xs={12} sm={6} lg={4}>
        <p>There were no matches!</p>
        </Grid>
        </>
      )
    }
    return (
      <Grid item xs={12} sm={6} lg={4}>
      <p>An error has occurred in image search, please try again.</p>
      </Grid>
    )
  }

  return(
  <Grid item container direction="row" >
 
    <Grid item xs={0} sm={2} />
    <Grid item xs={12} sm={8} >
    <Typography variant="h1">Your search results</Typography>
      <Grid container spacing="4">
      {searchResult()}
      </Grid>
      <br></br>
      {storedUrl && <AddCoffeeButton  url={storedUrl} addCoffee={addCoffee} />} 
    </Grid>
    <Grid item xs={0} sm={2} />
  </Grid>
  )  
}