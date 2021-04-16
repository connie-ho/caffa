import {React,useContext} from 'react'
import Carousel from 'react-elastic-carousel'
import CoffeeListItemCarousel from './CoffeeListItemCarousel.jsx';
import {getReviewsForCoffee, avgRatingForCoffee} from '../../helpers/selectors';
import DataContext from '../../contexts/DataContext';
import { Grid } from "@material-ui/core";

const CarouselTest = (props) => {
  
  const {state} = useContext(DataContext);
  const {homeCoffees} = props
  const reviews = state.reviews;

  const coffees = Object.values(homeCoffees)
  console.log(coffees)
  const breakPoints = [
    { width: 550, itemsToShow: 1, itemsToScroll: 1, pagination: false },
    { width: 850, itemsToShow: 2, itemsToScroll: 2, },
    { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
    { width: 1450, itemsToShow: 4, itemsToScroll: 2 },
    { width: 1750, itemsToShow: 4, itemsToScroll: 2 },
]
  const CoffeeList = coffees.map(coffee => {
    const coffeeReviews = getReviewsForCoffee(Object.values(reviews),coffee.id)
    const avgRating = avgRatingForCoffee(coffeeReviews);
    return (
      <Grid item xs={12}>
      <CoffeeListItemCarousel 
        key={coffee.id}
        coffee={coffee}
        avgRating={avgRating}
      />
      </Grid>
    )
  })

  return (
    <Carousel itemPadding={[50, 30]} breakPoints={breakPoints} enableAutoPlay autoPlaySpeed={5000}>
      {CoffeeList}
    </Carousel>
  )
}

export default CarouselTest