const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_FAVOURITE = "SET_FAVOURITE";
const SET_REVIEW = "SET_REVIEW";
const SET_COFFEE = "SET_COFFEE";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_APPLICATION_DATA:
      return {
        ...state,
        coffees: action.coffees,
        reviews: action.reviews,
        favourites: action.favourites,
        users: action.users
      }
      
    case SET_FAVOURITE:
      return {
        ...state,
        favourites: action.favourites,
      }
      case SET_REVIEW:
      return {
        ...state,
        reviews: action.reviews,
      }
    
    case SET_COFFEE:
      return {
        ...state,
        coffees: {...state.coffees, [action.coffee.id]:action.coffee}
      }
    

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  };
};

export {
  SET_APPLICATION_DATA,
  SET_FAVOURITE,
  SET_REVIEW,
  SET_COFFEE
}