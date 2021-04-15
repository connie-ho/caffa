import {useState, useContext, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';

import DataContext from '../../contexts/DataContext';
import FilterList from './FilterList';
import CoffeeList from './CoffeeList';
import Coffee from '../coffee-id/Coffee';

import {getFilteredCoffees} from '../../helpers/selectors';

// styles
import './Coffees.scss';

// Define categories to filter for
const categories = {
  'region': {
    name: 'Region',
    items: [] // get helper function to define this
  },
  'grain_species': {
    name: 'Grain Species',
    items: {1: {id: 1, type:'Arabica'}, 2: {id: 2, type: 'Robusta'}}},
  'acidity': {
    name: 'Acidity',
    items: {3: {id: 3, type:'Low'}, 4: {id: 4, type:'Low-Medium'}, 5: {id: 5, type:'Medium'}, 6:{id: 6, type:'Medium-High'}, 7:{id: 7, type:'High'}}
  },
  'roast': {
    name: 'Roast',
    items: {8:{id: 8, type:'Light'}, 9:{id: 9, type: 'Medium'}, 10:{id: 10, type: 'Dark'}}
  },
  'rating': {
    name: 'Rating',
    items: {11: {id: 11, type:1}, 12: {id: 12, type:2}, 13: {id: 13, type:3}, 14: {id: 14, type:4}, 15: {id: 15, type:5}}
  }
}

function Coffees(props) {
  
  const {state} = useContext(DataContext);
  const coffees = Object.values(state.coffees);
  const reviews = state.reviews;
  
  // FilterArray to apply to coffees
  const [filterItems, setFilterItems] = useState([])
  const [filterCat, setFilterCat] = useState({
    'region': [],
    'grain_species': [],
    'acidity': [],
    'roast': [],
    'rating': []
  })
  const [filteredCoffees, setFilteredCoffees] = useState(coffees)

  // Always set coffees when the entire data set changes

  const handleFilters = (filters)=>{
    const res = getFilteredCoffees(coffees, categories, filters)
    setFilteredCoffees(prev => res)
  }
  

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
              <FilterList 
                categories={categories}
                filterItems={filterItems}
                setFilterItems={setFilterItems}
                filterCat={filterCat}
                setFilterCat={setFilterCat}
                handleFilters={handleFilters}
              />
            </aside>
          <CoffeeList
            coffees={filteredCoffees}
          />
          </div>
          </>
        </Route>
      </Switch>
    </div>
  );
};
  
export default Coffees;