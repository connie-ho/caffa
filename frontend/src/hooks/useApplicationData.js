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
        dispatch({type:SET_FAVOURITE, favourite});

        return res.data.id;
      })
  }

  function deleteFavourite(id){

    const favourite = {
      ...state.favourites[id],
      favourite: null
    }

    const favourites = {
      ...state.favourites,
      [id]: favourite
    }

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