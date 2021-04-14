import {Route, Switch} from 'react-router-dom';
import FilterList from './FilterList';
import CoffeeList from './CoffeeList';
import Coffee from '../coffee-id/Coffee';

// styles
import './Coffees.scss';

function Coffees(props) {

  return (
    <div>
    <Switch>
        <Route path="/coffees/:id">
          <Coffee />
        </Route>
        <Route path="/coffees">
          <>
          <div
            className="coffees-page"
          >
            <aside>
              <FilterList/>
            </aside>
          <CoffeeList/>
          </div>
          </>
        </Route>
      </Switch>
    </div>
  );
};
  
export default Coffees;