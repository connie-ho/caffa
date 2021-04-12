
//DO NOT USE

const SET_COFFEE_DATA = "SET_COFFEE_DATA";
const SET_FAVOURITE = "SET_FAVOURITE";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_COFFEE_DATA:
      return {
        ...state,
        coffee: action.coffee,
        reviews: action.reviews,
        favourites: action.favourites,
        avgRating: action.avgRating,
        liked: action.liked
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
  SET_COFFEE_DATA,
  SET_FAVOURITE
}