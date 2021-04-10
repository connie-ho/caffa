import {useEffect, useState, useReducer} from 'react';
import axios from "axios";
// import reducer, {
//   SET_APPLICATION_DATA
// } from "../reducers/application";

function useApplicationData(){
  
  const [users, setUsers] = useState([])
  const [coffees, setCoffees] = useState([])
  const [reviews, setReviews] = useState([])
  const [favourites, setFavourites] = useState([])

  const [state, setState] = useState({
    users: [],
    coffees: [],
    reviews: [],
    favourites: []
  })


  useEffect(()=>{
    
    const fetchUsersData = async ()=>{
      const res = await axios.get("/api/users");
      setUsers(res.data)
    };
    const fetchCoffeesData = async ()=>{
      const res = await axios.get("/api/coffees");
      setCoffees(res.data)
    };
    const fetchReviewsData = async ()=>{
      const res = await axios.get("/api/reviews");
      setReviews(res.data)
    };
    const fetchFavouritesData = async ()=>{
      const res = await axios.get("/api/favourites");
      setFavourites(res.data)
    };

    fetchCoffeesData();
    fetchFavouritesData();
    fetchUsersData();
    fetchReviewsData();
  
  }, []);

  return {
    users,
    coffees,
    reviews,
    favourites,
    setCoffees,
    setUsers,
    setFavourites,
    setReviews
  };

};

export default useApplicationData;