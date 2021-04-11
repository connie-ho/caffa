import {Route, Switch} from 'react-router-dom';
import {useContext, useState} from 'react';
import DataContext from '../../contexts/DataContext';
import FilterList from './FilterList';
import CoffeeList from './CoffeeList';
import Coffee from '../coffee-id/Coffee';

function Coffees(props) {
  const {addFavourite, deleteFavourite} = props;
  return (
    <div>
    <Switch>
        <Route path="/coffees/:id">
          <Coffee 
            addFavourite={addFavourite}
            deleteFavourite={deleteFavourite}
          />
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