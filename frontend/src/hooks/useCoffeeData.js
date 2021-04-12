// DO NOT USE


import {useEffect, useReducer} from 'react';
import axios from "axios";
import reducer, {
  SET_COFFEE_DATA,
  SET_FAVOURITE
} from "../reducers/coffeeid";
import {getReviewsForCoffee, avgRatingForCoffee, getFavouritesForCoffee, isLiked} from '../helpers/selectors';

function useCoffeeData(id){

  const [coffeeState, dispatch] = useReducer(reducer, {});
  const user_id = 2; //temporary

  useEffect(()=>{
    Promise.all([
      axios.get(`/api/coffees/${id}`),
      axios.get("/api/reviews"),
      axios.get("/api/favourites"),
    ])
    .then(all=>{
      const coffee = [...all[0].data];
      const allReviews = [...all[1].data];
      const allFavourites = [...all[2].data];

      const reviews = getReviewsForCoffee(allReviews, coffee.id);
      const avgRating = avgRatingForCoffee(reviews);
      const favourites = getFavouritesForCoffee(allFavourites, coffee.id);
      const liked = isLiked(favourites, user_id);

      dispatch({type: SET_COFFEE_DATA, coffee, reviews, favourites, avgRating, liked});
    })
  }, [id]);


  function addFavourite(coffee_id, user_id){

    const id = coffeeState.favourites.length + 1;
    const favourite = {
      id,
      coffee_id,
      user_id
    }

    const favourites = {
      ...coffeeState.favourites,
      [id]: favourite
    }

    console.log(coffeeState)

    return axios.post(`/api/favourites`, favourite)
      .then(res=>{
        dispatch({type: SET_FAVOURITE, favourites})
      })

  }

  return {
    state,
    addFavourite
  };

};

export default useCoffeeData;