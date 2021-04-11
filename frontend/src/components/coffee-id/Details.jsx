import {useState} from 'react';

import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

export default function Details(props) {
  
  const {
    coffee, 
    reviews, 
    avgRating, 
    favourites, 
    addFavourite, 
    deleteFavourite,
    isLiked} = props;

  console.log(favourites)

  const user_id = 2 // temporary

  const [fav, setFav] = useState(isLiked(favourites, user_id))

  // add/delete favourites logic
  const onClickHandler = (e) => {
    e.preventDefault()
    if(fav){  
      deleteFavourite(fav)
      setFav(prev => null)   
      return (
        <FavoriteIcon/>
        ) 
    } else {
      addFavourite(coffee.id, user_id)
      .then(res => setFav(prev=>(res.data)))
      return (
        <FavoriteBorderIcon/> 
    )
    }

  }


  return (
    <>
      <div>
        <aside>
          <img src={coffee.image_url} alt={`${coffee.name}`}/>
        </aside>
        <div>
          <h2>{coffee.brand}</h2>
          <h1>{coffee.name}</h1>
          <h1>{avgRating} {avgRating=== 1? 'Star' : 'Stars'}</h1>
          <h2>{reviews.length} {reviews.length === 1 ? 'Rating' : 'Ratings'} </h2>
          <p>{coffee.description}</p>
          <div>
            <IconButton 
              type="submit"
              aria-label="delete"
              onClick={onClickHandler}>
                {isLiked(favourites,user_id) &&  <FavoriteIcon/>} 
                {!isLiked(favourites,user_id) &&  <FavoriteBorderIcon/>} 
            </IconButton>
            {favourites.length} {favourites.length === 1? 'like':'likes'}
          </div>
        </div>
        <div>
          <div>
            Roast: {coffee.roast} Roast
          </div>
          <div>
           Acidity: {coffee.acidity}
          </div>
          <div>
            Grain: {coffee.grain_species}
          </div>
        </div>      
      </div>
    </>
  )
}
