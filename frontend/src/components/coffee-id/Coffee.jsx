import {useParams} from 'react-router-dom';
import {useContext} from 'react';
import DataContext from '../../contexts/DataContext';
import Details from './Details';
import ReviewList from './ReviewList';
import {getReviewsForCoffee, avgRatingForCoffee, getFavouritesForCoffee, isLiked} from '../../helpers/selectors';

export default function Coffee(props) {
  const params = useParams();
  const coffeeId = Number(params.id);
  const {addFavourite, deleteFavourite} = props;

  // temporary userId
  const user_id = 2;

 // get all data 
 const {state} = useContext(DataContext);

 const coffees = state.coffees;
 const reviews = state.reviews;
 const favourites = state.favourites;

 // filter for specific coffee details
 const coffee = coffees[coffeeId - 1];

  // filter for coffee reviews & favourites
  const coffeeReviews = getReviewsForCoffee(reviews, coffeeId);
  const avgRating = avgRatingForCoffee(coffeeReviews);
  const coffeeFavourites = getFavouritesForCoffee(favourites, coffeeId);

  // check if coffee is already liked
  const liked = isLiked(coffeeFavourites, user_id);

  return (
    <div>
      <>
        <Details 
          coffee={coffee}
          reviews={coffeeReviews}
          favourites={coffeeFavourites}
          avgRating={avgRating}
          addFavourite={addFavourite}
          deleteFavourite={deleteFavourite}
          liked={liked}
        />
        <h1>Community Reviews</h1>
        <ReviewList
          coffeeId={coffeeId}
        />
      </>
    </div>
  )
}
