import {useState, useContext} from 'react';
import FavouriteContext from '../../contexts/FavouriteContext';
import {calcFavourites} from '../../helpers/selectors';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

export default function Details(props) {
  
  const {addFavourite, deleteFavourite} = useContext(FavouriteContext);

  const {
    coffee, 
    reviews, 
    avgRating, 
    favourites, 
    isLiked} = props;

  const user_id = 2 // temporary

  const [fav, setFav] = useState(isLiked(favourites, user_id))
  const numFav = calcFavourites(favourites);
  // add/delete favourites logic
  const onClickHandler = (e) => {
    
    e.preventDefault()

    if(fav){  
      deleteFavourite(fav)
      setFav(prev => false)
    } else {
      addFavourite(coffee.id, user_id)
      .then(res => {
        console.log('in handler')
        console.log(res)
        setFav(prev=>res)
      })
    }

    return false;
    
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
                {fav &&  <FavoriteIcon/>} 
                {!fav &&  <FavoriteBorderIcon/>} 
            </IconButton>
            {numFav} {numFav === 1? 'like':'likes'}
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
