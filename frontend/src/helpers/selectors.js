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
      return true;
    }
  }

  return false;

}

// get values of coffee characteristics in all items
export function charValues(characteristics) {

  const res = {};

  for(const char of characteristics){
    res[char] = char;
  }

}


// get filtered coffees
// filterCategories are all the possible categories the user can use to filter
// filterObj are all the filters the user has chosen
export function getFilteredCoffees(allCoffees, filterCategories, filterObj){

  const res = [];

  if(!allCoffees.length){
    return res;
  }

  for(const coffee of allCoffees){
    // category are things like region, acidity, roast etc ...
    for(const category in filterObj){
      // item is a number that maps to the items in filtercategories
      for(const item of filterObj[category]){
        if(coffee[category] === filterCategories[category]['items'][item]['type']){
          res.push(coffee)
        }
      }
    }
  }

  return res;
}

export function hasFilters(filterObj){
  
  for(const filter of Object.values(filterObj)){
    if(!filter.length){
      return false;
    }
  }

  return true;

}
