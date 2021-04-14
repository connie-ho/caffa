// returns array of reviews for that coffee
export function getReviewsForCoffee(reviews, coffeeId){
  const res = [];

  for (const review of reviews){

    if (review && Number(review.coffee_id) === Number(coffeeId)){
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

// returns array of favourites for that coffee
export function getFavouritesForCoffee(favourites, coffeeId){
  const res = [];

  for (const fav of favourites){

    if (fav && Number(fav.coffee_id) === Number(coffeeId)){
      res.push(fav);
    }
  }
  return res;
}

// returns the fav id if the coffee is already liked otherwise null;
// pass in the filtered favourites array for that coffee
export function isLiked(favourites, userId){

  for(const fav of favourites){
    if(fav.user_id === userId) return fav.id;
  }

  return null;

}

// pass in filtered favourites array for that coffee
export function calcFavourites(favourites){

  let num = 0;

  for(const fav of favourites) {

    if(fav){
      num += 1
    }
  }
  return num;
}

// pass in filtered reviews array for that coffee
export function isReviewed(reviews, userId){

  if(!userId){
    return false;
  }

  for(const review of reviews){
    if(Number(review.user_id) === Number(userId)){
      console.log('returning true')
      return true;
    }
  }

  return false;

}