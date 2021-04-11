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
    favourites: []
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
      const coffees = [...all[1].data];
      const reviews = [...all[2].data];
      const favourites = [...all[3].data];
      dispatch({type: SET_APPLICATION_DATA, users, coffees, reviews, favourites});
    })
  }, []);


  function addFavourite(coffee_id, user_id){

    const id = state.favourites.length;
    const favourite = {
      id,
      coffee_id,
      user_id
    }

    const favourites = {
      ...state.favourites,
      [id]: favourite
    }

    return axios.put(`api/favourites/${id}`, favourite)
      .then(res=>{
        dispatch({type: SET_FAVOURITE, favourites})
      })

  }

  return {
    state,
    addFavourite
  };

};

export default useApplicationData;