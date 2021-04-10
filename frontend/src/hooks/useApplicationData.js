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
      axios.get("/api/coffees"),
      axios.get("/api/reviews"),
    ]).then((all) => {
      const coffees = {...all[0].data};
      const reviews =  {...all[1].data};
  
      dispatch({type: SET_APPLICATION_DATA, coffees, reviews});
    });
  }, []);

  return {
    state
  };

};

export default useApplicationData;