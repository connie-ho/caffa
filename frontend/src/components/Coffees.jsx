import {Route, Switch} from 'react-router-dom';
import Coffee from './Coffee';

const Coffees = () => {
  return (
    <div>
      <Switch>
        <Route path="/coffees/:id" component={Coffee}/>
        <Route path="/coffees">
          <h1>All Coffees</h1>
        </Route>
      </Switch>
    </div>
  )
};

export default Coffees;