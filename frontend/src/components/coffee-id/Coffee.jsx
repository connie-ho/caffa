import {useParams} from 'react-router-dom';
import {useContext} from 'react';
import DataContext from '../../contexts/DataContext';
import Details from './Details';
import ReviewList from './ReviewList';
import AddReview from './AddReview';
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
 const coffee = coffees[coffeeId];

  // filter for coffee reviews & favourites
  const coffeeReviews = getReviewsForCoffee(Object.values(reviews), coffeeId);
  const avgRating = avgRatingForCoffee(coffeeReviews);
  const coffeeFavourites = getFavouritesForCoffee(Object.values(favourites), coffeeId);


  return (
    <div>
    {coffee && (
      <>
        <Details 
          coffee={coffee}
          reviews={coffeeReviews}
          favourites={coffeeFavourites}
          avgRating={avgRating}
          addFavourite={addFavourite}
          deleteFavourite={deleteFavourite}
          isLiked={isLiked}
        />
        <h1>Community Reviews</h1>
        <ReviewList
          coffeeId={coffeeId}
        />
        <AddReview 
          coffee={coffee}
        />
      </>)
    }
    </div>
  )
}
