const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_FAVOURITE = "SET_FAVOURITE";

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
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  };
};

export {
  SET_APPLICATION_DATA,
  SET_FAVOURITE
}