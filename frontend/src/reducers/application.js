const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_APPLICATION_DATA:
      return {
        ...state,
        coffees: action.coffees,
        reviews: action.reviews
      }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  };
};

export {
  SET_APPLICATION_DATA
}