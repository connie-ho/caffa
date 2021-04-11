import {useParams} from 'react-router-dom';
import Details from './Details';
import ReviewList from './ReviewList';

export default function Coffee(props) {
  const params = useParams();
  const coffeeId = Number(params.id);
  const {addFavourite} = props;

  return (
    <div>
      <>
        <Details 
          coffeeId={coffeeId}
          addFavourite={addFavourite}
        />
        <h1>Community Reviews</h1>
        <ReviewList
          coffeeId={coffeeId}
        />
      </>
    </div>
  )
}
