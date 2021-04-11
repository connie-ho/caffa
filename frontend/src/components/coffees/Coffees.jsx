import {Route, Switch} from 'react-router-dom';

import FilterList from './FilterList';
import CoffeeList from './CoffeeList';
import Coffee from '../coffee-id/Coffee';

function Coffees(props) {
  return (
    <div>
    <Switch>
        <Route path="/coffees/:id">
          <Coffee />
        </Route>
        <Route path="/coffees">
          <>
          <h1>All Coffees</h1>
            <aside>
              <FilterList/>
            </aside>
          <CoffeeList/>
          </>
        </Route>
      </Switch>
    </div>
  );
};
  
export default Coffees;