import {React,useContext} from 'react'
import Carousel from 'react-elastic-carousel'
import CoffeeListItem from './../../coffees/CoffeeListItem'
import {getReviewsForCoffee, avgRatingForCoffee} from '../../../helpers/selectors';
import DataContext from '../../../contexts/DataContext';
import { Grid } from "@material-ui/core";
import './CarouselTest.scss';

const CoffeeCarousel = (props) => {
  
  const {state} = useContext(DataContext);
  const {homeCoffees, type} = props
  const reviews = state.reviews;
  console.log('coffee state', state.coffees)
  const coffees = Object.values(homeCoffees)
  console.log(coffees)
  const breakPoints = [
    { width: 1, itemsToShow: 1, itemsToScroll: 1, pagination: false },
    { width: 500, itemsToShow: 2, itemsToScroll: 1, pagination: true },
    { width: 1000, itemsToShow: 3, itemsToScroll: 1, pagination: true },
    { width: 1300, itemsToShow: 4, itemsToScroll: 2, pagination: true},
    { width: 1600, itemsToShow: 5, itemsToScroll: 2, pagination: true }
]
  console.log(window)
  const FavoritesCoffeeList = coffees.map(coffee => {
    const coffeeReviews = getReviewsForCoffee(Object.values(reviews),coffee.id)
    const avgRating = avgRatingForCoffee(coffeeReviews);
    return (
      <Grid item xs={12} >
      <CoffeeListItem
        key={coffee.id}
        coffee={coffee}
        avgRating={avgRating}
      />
      </Grid>
    )
  })

  const MostReviewedCoffeeList = Object.values(state.coffees).sort((a,b) => {
    return b.avg_rating - a.avg_rating
  })

  const SlicedCoffeeList = MostReviewedCoffeeList.slice(0,6).map(coffee => {
    const coffeeReviews = getReviewsForCoffee(Object.values(reviews),coffee.id)
    const avgRating = avgRatingForCoffee(coffeeReviews);
    return (
      <Grid item xs={12}>
      <CoffeeListItem
        key={coffee.id}
        coffee={coffee}
        avgRating={avgRating}
      />
      </Grid>
    )
  })

  if (type === 'favorite') {
  return (
    <Carousel itemPadding={[30, 10]} breakPoints={breakPoints} >
      {FavoritesCoffeeList}
    </Carousel>
  )
  }
  else if (type === 'rating') {
    return (
      <Carousel itemPadding={[30, 10]} breakPoints={breakPoints} >
      {SlicedCoffeeList}
    </Carousel>
    )
  }
}

export default CoffeeCarousel