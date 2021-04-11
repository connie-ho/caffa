import {useContext} from 'react';
import DataContext from '../../contexts/DataContext';
import {getReviewsForCoffee, avgRatingForCoffee} from '../../helpers/selectors';

import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

export default function Details({coffeeId}) {
  
  const {state} = useContext(DataContext);
  const coffees = state.coffees;
  const reviews = state.reviews;

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
          <IconButton aria-label="delete">
            <FavoriteBorderIcon />
          </IconButton>
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
