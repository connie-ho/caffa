import {useEffect, useReducer} from 'react';
import axios from "axios";
import reducer, {
  SET_APPLICATION_DATA,
  SET_FAVOURITE,
  SET_REVIEW,
  SET_COFFEE
} from "../reducers/application";
import {getRegions} from '../helpers/selectors';

function useApplicationData(){

  const [state, dispatch] = useReducer(reducer, {
    users: {},
    coffees: {},
    reviews: {},
    favourites: {},
    regions: {}
  });


  useEffect(()=>{

    Promise.all([
      axios.get("/api/users"),
      axios.get("/api/coffees"),
      axios.get("/api/reviews"),
      axios.get("/api/favourites"),
    ])
    .then(all=>{

      // copy users into an object
      const users = {}
      for(const user of all[0].data){
        users[user.id] = user;
      }

      // copy coffeess into an object
      const coffees = {}
      for(const coffee of all[1].data){
        coffees[coffee.id] = coffee;
      }

      // copy reviews into an object
      const reviews = {}
      for(const review of all[2].data){
        reviews[review.id] = review;
      }

      // copy favourites into an object
      const favourites = {}
      for(const fav of all[3].data){
        favourites[fav.id] = fav;
      }

      const regions = getRegions(Object.values(coffees));

      dispatch({type: SET_APPLICATION_DATA, users, coffees, reviews, favourites, regions});
    })
  }, []);


  function addFavourite(coffee_id, user_id){

    const req = {
      coffee_id,
      user_id
    }

    return axios.post(`/api/favourites`, req)
      .then(res=>{

        const favourite = {
          ...res.data
        }

        const favourites = {
          ...state.favourites,
          [res.data.id]: favourite
        }

        dispatch({type:SET_FAVOURITE, favourites});
        return res.data.id;
      })
  }

  function deleteFavourite(id){

    const favourites = {
      ...state.favourites,
      [id]: null
    }

    return axios.delete(`/api/favourites/${id}`)
      .then(res=>{
        dispatch({type: SET_FAVOURITE, favourites})
      })

  }

  function addReview(params){

    const {coffee_id, user_id, description, rating} = params;

    const req = {
      coffee_id,
      user_id,
      description, 
      rating
    }

    return axios.post(`/api/reviews`, req)
      .then(res=>{

        const review = {
          ...res.data
        }

        const reviews = {
          ...state.reviews,
          [res.data.id]: review
        }

        dispatch({type:SET_REVIEW, reviews});
        return res.data.id;
      })
  }

  function deleteReview(id){

    const reviews = {
      ...state.reviews,
      [id]: null
    }

    return axios.delete(`/api/reviews/${id}`)
      .then(res=>{
        dispatch({type: SET_REVIEW, reviews})
      })

  }

  function editReview(params){

    const {description, rating, id} = params;

    const req = {
      id,
      description, 
      rating
    }
    console.log('inside edit review request')
    return axios.patch(`/api/reviews/${id}`, req)
      .then(res=>{

        const review = {
          ...res.data
        }

        const reviews = {
          ...state.reviews,
          [id]: review
        }

        dispatch({type:SET_REVIEW, reviews});
      })
  }


  function addCoffee(formData) {
    return axios.post(`/api/coffees`, formData)
    .then(res => {
      const coffee = {
        ...res.data
      }
      console.log('coffee data', coffee)
      
      dispatch({type: SET_COFFEE, coffee})
      return res.data.id

    })
  }


  return {
    state,
    addFavourite,
    deleteFavourite,
    addReview,
    editReview,
    deleteReview,
    addCoffee,
  };

};

export default useApplicationData;