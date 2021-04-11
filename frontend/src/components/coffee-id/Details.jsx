
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
    liked} = props;


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
              onClick={()=>{liked? deleteFavourite(liked) :addFavourite(coffee.id, 2)}}
              aria-label="delete">
              
              <FavoriteBorderIcon/>
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
