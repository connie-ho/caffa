// returns array of reviews for that coffee
export function getReviewsForCoffee(reviews, coffeeId){
  const res = [];

  for (const review of reviews){
    if (review.coffee_id === coffeeId){
      res.push(review);
    }
  }
  return res;
}

// returns avg rating of coffee
export function avgRatingForCoffee(coffeeReviews){

  if(!coffeeReviews.length){
    return;
  }

  return coffeeReviews.reduce((a, b) => (Number(a.rating) + Number(b.rating)))/ coffeeReviews.length;
}