import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import DataContext from "../../contexts/DataContext";
import UserContext from "../../contexts/UserContext";
import Details from "./Details";
import Cafe from "./Cafe";
import ReviewList from "./ReviewList";
import AddReview from "./AddReview";
import {
  getReviewsForCoffee,
  getFavouritesForCoffee,
  isLiked,
  isReviewed,
} from "../../helpers/selectors";
import classes from "./Coffee.module.scss";

export default function Coffee(props) {
  const params = useParams();
  const coffeeId = Number(params.id);
  const { addFavourite, deleteFavourite } = props;

  // get all data
  const { state } = useContext(DataContext);

  const coffees = state.coffees;
  const reviews = state.reviews;
  const favourites = state.favourites;

  // filter for specific coffee details
  const coffee = coffees[coffeeId];

  // filter for coffee reviews & favourites
  const [coffeeReviews, setCoffeeReviews] = useState(
    getReviewsForCoffee(Object.values(reviews), coffeeId)
  );
  const coffeeFavourites = getFavouritesForCoffee(
    Object.values(favourites),
    coffeeId
  );

  // change state everytime a review is added or deleted
  useEffect(() => {
    setCoffeeReviews((prev) =>
      getReviewsForCoffee(Object.values(reviews), coffeeId)
    );
  }, [reviews, coffeeId]);

  // check if coffee is already reviewed by user
  const { user } = useContext(UserContext);
  const userId = user ? user.id : null;
  const [reviewed, setReviewed] = useState(false);

  useEffect(() => {
    setReviewed((prev) => isReviewed(coffeeReviews, userId));
  }, [coffeeReviews, userId]);

  // review form logic
  const [openReviewForm, setOpenReviewForm] = useState(false);

  // cafe logic to be passed as props
  const [cafeData, setCafeData] = useState(null);

  return (
    <div>
      {coffee && (
        <>
          <Details
            coffee={coffee}
            reviews={coffeeReviews}
            favourites={coffeeFavourites}
            addFavourite={addFavourite}
            deleteFavourite={deleteFavourite}
            isLiked={isLiked}
          />
          <div className={classes["coffee-cafe-section"]}>
            <h1 className={classes["coffee-review-heading"]}>
              Featured Cafe for this Coffee
            </h1>
            <Cafe
              cafeData={cafeData}
              setCafeData={setCafeData}
              coffee={coffee}
            />
          </div>
          <div className={classes["coffee-review-wrapper"]}>
            <h1 className={classes["coffee-review-heading"]}>
              Community Reviews
            </h1>
            <div className={classes["coffee-review-section"]}>
              <ReviewList
                coffeeId={coffeeId}
                coffee={coffee}
                openReviewForm={openReviewForm}
                setOpenReviewForm={setOpenReviewForm}
              />
              {!reviewed && (
                <AddReview
                  coffee={coffee}
                  openReviewForm={openReviewForm}
                  setOpenReviewForm={setOpenReviewForm}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
