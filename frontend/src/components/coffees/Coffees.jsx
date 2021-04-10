import {Route, Switch} from 'react-router-dom';

import FilterList from './FilterList';
import CoffeeList from './CoffeeList';

function Coffees(props) {
  return (
    <div>
    <Switch>
        <Route path="/coffees/:id">
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