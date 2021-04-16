import {useState, useContext, useEffect} from 'react';

import FavouriteContext from '../../contexts/FavouriteContext';
import UserContext from '../../contexts/UserContext';

import {makeStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import {calcFavourites} from '../../helpers/selectors';

import bean from '../../images/31080.png';
import classes from './Coffee.module.scss';

export default function Details(props) {
  
  const {
    coffee, 
    reviews, 
    favourites, 
    isLiked} = props;

  // user logic
  const {user, openLogin, setOpenLogin} = useContext(UserContext);
  const userId = user? user.id : null; 
  
  // add/delete favourites logic
  const {addFavourite, deleteFavourite} = useContext(FavouriteContext);

  const [fav, setFav] = useState(isLiked(favourites, userId))
  
  useEffect(()=>{
    setFav(prev => isLiked(favourites, userId))
  }, [favourites, userId, isLiked])
  
  const numFav = calcFavourites(favourites);

  const onClickHandler = (e) => {
    
    e.preventDefault()

    if(!user){
      setOpenLogin(prev => true);
      return;
    }

    if(fav){  
      deleteFavourite(fav)
      setFav(prev => false)
    } else {
      addFavourite(coffee.id, user.id)
      .then(res => {
        setFav(prev=>res)
      })
    }

    return false;
    
  }


  return (
    <>
      <div
        className={classes['coffee-details-section']}
      >
        <aside>
          <img 
            src={coffee.image_url}
            alt={`${coffee.name}`}
            className={classes['coffee-details-img']}
          />
        </aside>
        <div>
          <h2 className={classes['coffee-details-brand']}>{coffee.brand}</h2>
          <h1 className={classes['coffee-details-name']}>{coffee.name}</h1>
          <div className={classes['coffee-details-region']}>
            <LocationOnIcon/>
            <h3 >{coffee.region}</h3>
          </div>
          {!coffee.avg_rating && <h1>No Reviews Yet!</h1>}
          {coffee.avg_rating && (
          <>
            <div className={classes['coffee-details-rating']}>
              <h1>{coffee.avg_rating} </h1>
              <div>
                <img src={bean} style={{ height:'15px', width:'15px'}} />
                <p>{reviews.length} {reviews.length === 1 ? 'Rating' : 'Ratings'} </p>
              </div>
            </div>
          </>
          )}
          <p>{coffee.description}</p>
          <div>
            <IconButton 
              type="submit"
              aria-label="delete"
              onClick={onClickHandler}>
                {fav &&  <FavoriteIcon className={classes['coffee-like-icon']}/>} 
                {!fav &&  <FavoriteBorderIcon/>} 
            </IconButton>
            {numFav} {numFav === 1? 'like':'likes'}
          </div>
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
    </>
  )
}
