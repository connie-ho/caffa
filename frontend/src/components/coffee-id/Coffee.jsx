import {useParams} from 'react-router-dom';
import Details from './Details';

export default function Coffee() {
  const params = useParams();
  const coffeeId = Number(params.id);

  return (
    <div>
      <>
        <Details 
          coffeeId={coffeeId}
        />
      </>
    </div>
  )
}
