import {Route, Switch} from 'react-router-dom';

const CoffeeList = () => {

  return (
    <div>
      <Switch>
        <Route path="/coffees/:id">
        </Route>
        <Route path="/coffees">
          <h1>All Coffees</h1>
        </Route>
      </Switch>
    </div>
  )
};

export default CoffeeList;