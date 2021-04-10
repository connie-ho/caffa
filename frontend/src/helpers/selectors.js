// returns array of reviews for that coffee
export function getReviewsForCoffee(reviews, coffeeId){
  const res = [];

  for (const review of reviews){

    if (Number(review.coffee_id) === Number(coffeeId)){
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

  if(coffeeReviews.length === 1){
    return Number(coffeeReviews[0].rating);
  }

  let sum = 0; 
  
  for (const review of coffeeReviews){
    sum += Number(review.rating);
  }


  return Math.round(sum/coffeeReviews.length*10)/10;
}