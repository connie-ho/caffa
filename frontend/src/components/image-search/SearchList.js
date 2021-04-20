import {React, useContext, useEffect, useState} from 'react';
import Fuse from 'fuse.js'
import {getReviewsForCoffee, avgRatingForCoffee} from '../../helpers/selectors';
import CoffeeListItem from '../coffees/CoffeeListItem';
import {stripSearchTerms} from './helpers.js'
import DataContext from '../../contexts/DataContext';
import AddCoffeeButton from '../add-coffee/AddCoffeeButton';
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  header: {
    padding:'1em',
    paddingLeft:'0px',
    fontSize:'3.5em'
  }
})

export default function SearchList(props) {
  
  const {state} = useContext(DataContext);
  const coffees = Object.values(state.coffees);
  const reviews = state.reviews;
  const {addCoffee, results} = props;
  const [storedUrl, setStoredURL] = useState('')
  const [storedArray, setStoredArray] = useState([])
  const classes = useStyles()
  
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

    if(searchTerm !== 'error'){

      const string = stripSearchTerms(searchTerm)
    
      console.log('stripped string', string)
      const Results = fuse.search(string, {limit: 5}) 
    
      if (Results.length !== 0) { 
      return Results.map(coffee => {
        const coffeeReviews = getReviewsForCoffee(Object.values(reviews),coffee.item.id)
        const avgRating = avgRatingForCoffee(coffeeReviews);
        return (
        <Grid item xs={12} sm={4} lg={3}>
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
        <Grid item xs={12} >
        <Typography variant="p" style={{fontSize:'5em'}}>There were no matches!</Typography>
        </Grid>
        </>
      )
    }
    return (
      <Grid item xs={12}>
      <Typography variant="p" style={{fontSize:'2em'}}>There was an error in image search. Your image may not have been detected as a coffee bean bag.</Typography>
      </Grid>
    )
  }

  return(
  <Grid container direction="row" >
 
    <Grid item xs={0} sm={1} />
    <Grid item xs={12} sm={10} >
    <Typography variant="h2" className={classes.header}>Your search results</Typography>
      <Grid container spacing="5">
      {searchResult()}
      </Grid>
      <br></br>
      {storedUrl && <AddCoffeeButton  url={storedUrl} addCoffee={addCoffee} />} 
    </Grid>
    <Grid item xs={0} sm={1} />
  </Grid>
  )  
}