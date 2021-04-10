import {useEffect, useState, useReducer} from 'react';
import axios from "axios";
// import reducer, {
//   SET_APPLICATION_DATA
// } from "../reducers/application";

function useApplicationData(){
  
  const [state, setState] = useState({
    users: [],
    coffees: [],
    reviews: [],
    favourites: []
  })

  // const [state, dispatch] = useReducer(reducer, {
  //   users: [],
  //   coffees: [],
  //   reviews: {},
  //   favourites: []
  // });

  useEffect(()=>{
    Promise.all([
      axios.get("/api/users"),
      axios.get("/api/coffees"),
      axios.get("/api/reviews"),
      axios.get("/api/favourites")
    ])
    .then(all=>{
      setState(prev=>({
        ...prev,
        users: [...all[0].data],
        coffees: [...all[1].data],
        reviews: [...all[2].data],
        favourites: [...all[3].data]
      }))
      // dispatch({type: SET_APPLICATION_DATA, users, coffees, reviews, favourites});
    })
  }, []);

  return {
    state,
    setState
  };

};

export default useApplicationData;