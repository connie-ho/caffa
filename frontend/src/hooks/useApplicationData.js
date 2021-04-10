import {useEffect,  useReducer} from 'react';
import axios from "axios";
import reducer, {
  SET_APPLICATION_DATA
} from "../reducers/application";

function useApplicationData(){
  
  const [state, dispatch] = useReducer(reducer, {
    users: [],
    coffees: [],
    reviews: {},
    favourites: []
  });

  useEffect(()=>{
    Promise.all([
      axios.get("/api/users"),
      axios.get("/api/coffees"),
      axios.get("/api/reviews"),
      axios.get("/api/favourites"),
    ]).then((all) => {
      const users = {...all[0].data};
      const coffees = {...all[0].data};
      const reviews =  {...all[1].data};
      const favourites = {...all[0].data};
  
      dispatch({type: SET_APPLICATION_DATA, users, coffees, reviews, favourites});
    });
  }, []);

  return {
    state
  };

};

export default useApplicationData;