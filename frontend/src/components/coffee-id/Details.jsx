import {useContext} from 'react';
import CoffeeContext from '../../contexts/CoffeeContext';
import ReviewContext from '../../contexts/ReviewContext';
import {getReviewsForCoffee, avgRatingForCoffee} from '../../helpers/selectors';


export default function Details({coffeeId}) {
  
  const {coffees} = useContext(CoffeeContext);
  const {reviews} = useContext(ReviewContext);
  const coffee = coffees[coffeeId - 1];

  const coffeeReviews = getReviewsForCoffee(reviews, coffeeId)
  let avgRating = avgRatingForCoffee(coffeeReviews);

  if (!avgRating) {
    avgRating = 'No Ratings Yet!'
  } else {
    avgRating += ' Stars'
  }

  return (
    <>
      <div>
        <aside>
          <img src={coffee.image_url} alt={`${coffee.name}`}/>
        </aside>
        <div>
          <h2>{coffee.brand}</h2>
          <h1>{coffee.name}</h1>
          <h1>{avgRating}</h1>
          <h2>{coffeeReviews.length} {coffeeReviews.length === 1 && 'Rating' || 'Ratings'} </h2>
          <p>{coffee.description}</p>
        </div>
        <div>
          <div>
            Roast: {coffee.roast} Roast
          </div>
          <div>
           Acidity: {coffee.acidity}
          </div>
          <div>
            Grain: {coffee.grain_species}
          </div>
        </div>      
      </div>
    </>
  )
}
