import {Route, Switch} from 'react-router-dom';
import Coffee from './Coffee';

const Coffees = (props) => {

  const {coffees} = props;

  return (
    <div>
      <Switch>
        <Route path="/coffees/:id">
          <Coffee
            coffees={coffees}
          />
        </Route>
        <Route path="/coffees">
          <h1>All Coffees</h1>
        </Route>
      </Switch>
    </div>
  )
};

export default Coffees;