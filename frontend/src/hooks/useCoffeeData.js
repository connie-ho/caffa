import {useEffect, useReducer} from 'react';
import axios from "axios";
import reducer, {
  SET_COFFEE_DATA,
  SET_FAVOURITE
} from "../reducers/coffee";

function useCoffeeData(state, id){

  function addFavourite(coffee_id, user_id){

    const id = state.favourites.length + 1;
    const favourite = {
      id,
      coffee_id,
      user_id
    }

    const favourites = {
      ...state.favourites,
      [id]: favourite
    }

    console.log(state)

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

export default useApplicationData;