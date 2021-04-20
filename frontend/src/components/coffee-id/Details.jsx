import {useState, useContext, useEffect} from 'react';

import FavouriteContext from '../../contexts/FavouriteContext';
import UserContext from '../../contexts/UserContext';

import IconButton from '@material-ui/core/IconButton';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
  const {user, setOpenLogin} = useContext(UserContext);
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
    <div className={classes['coffee-details-wrapper']}>
      <div
        className={classes['coffee-details-section']}
      >
        <img 
          src={coffee.image_url}
          alt={`${coffee.name}`}
          className={classes['coffee-details-img']}
        />
        <div>
          <h2 className={classes['coffee-details-brand']}>{coffee.brand}</h2>
          <h1 className={classes['coffee-details-name']}>{coffee.name}</h1>
          <div className={classes['coffee-details-region']}>
            <LocationOnIcon/>
            <h3 >{coffee.region}</h3>
          </div>
          {!coffee.avg_rating && 'No Reviews Yet!'}
          {coffee.avg_rating && (
          <>
            <div className={classes['coffee-details-rating']}>
              <h1>{coffee.avg_rating} </h1>
              <div>
                <img src={bean} style={{ height:'15px', width:'15px'}} alt="bean"/>
                <p>{reviews.length} {reviews.length === 1 ? 'Rating' : 'Ratings'} </p>
              </div>
            </div>
          </>
          )}
          <p className={classes['coffee-details-description']}>{coffee.description}</p>
          <div>
            <IconButton 
              type="submit"
              aria-label="delete"
              onClick={onClickHandler}>
                {fav &&  <FavoriteIcon className={classes['coffee-like-icon']}/>} 
                {!fav &&  <FavoriteBorderIcon className={classes['coffee-unlike-icon']}/>} 
            </IconButton>
            {numFav} {numFav === 1? 'like':'likes'}
          </div>
        </div>
      </div>
      </div>

      <div className={classes['coffee-characteristic-section']}>
        <div className={classes['characteristic']} >
          <p>Roast</p>
          <FontAwesomeIcon className={classes.icon} icon="fire"/>
          {coffee.roast}
        </div>
        <div className={classes['characteristic']}>
          <p>Acidity</p>
          <FontAwesomeIcon className={classes['icon']} icon="flask"/>
          {coffee.acidity}
        </div>
        <div className={classes['characteristic']}>
          <p>Grain</p>
          <FontAwesomeIcon className={classes['icon']} icon="dna"/>
          {coffee.grain_species}
        </div>
      </div>      
    </>
  )
}
