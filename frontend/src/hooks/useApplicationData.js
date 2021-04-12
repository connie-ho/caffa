import {useEffect, useReducer} from 'react';
import axios from "axios";
import reducer, {
  SET_APPLICATION_DATA,
  SET_FAVOURITE
} from "../reducers/application";

function useApplicationData(){

  const [state, dispatch] = useReducer(reducer, {
    users: [],
    coffees: [],
    reviews: [],
    favourites: {}
  });


  useEffect(()=>{

    Promise.all([
      axios.get("/api/users"),
      axios.get("/api/coffees"),
      axios.get("/api/reviews"),
      axios.get("/api/favourites"),
    ])
    .then(all=>{
      const users = [...all[0].data];


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


      dispatch({type: SET_APPLICATION_DATA, users, coffees, reviews, favourites});
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
        console.log('inside post request')
        console.log(res.data.id)
        return res.data.id;
      })
  }

  function deleteFavourite(id){

    const favourites = {
      ...state.favourites,
      [id]: null
    }
    console.log('in delete request')


    return axios.delete(`/api/favourites/${id}`)
      .then(res=>{
        dispatch({type: SET_FAVOURITE, favourites})
      })

  }


  return {
    state,
    addFavourite,
    deleteFavourite
  };

};

export default useApplicationData;