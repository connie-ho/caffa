import {useParams} from 'react-router-dom';
import Details from './Details';
import ReviewList from './ReviewList';

export default function Coffee() {
  const params = useParams();
  const coffeeId = Number(params.id);

  return (
    <div>
      <>
        <Details 
          coffeeId={coffeeId}
        />
        <h1>Community Reviews</h1>
        <ReviewList
          coffeeId={coffeeId}
        />
      </>
    </div>
  )
}
