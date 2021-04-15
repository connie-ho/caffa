import {useState, useContext, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';

import DataContext from '../../contexts/DataContext';
import Coffee from '../coffee-id/Coffee';
import CoffeeList from './CoffeeList';
import FilterList from './FilterList';
import SortList from './SortList';

import {getFilteredCoffees} from '../../helpers/selectors';

// styles
import './Coffees.scss';

// Define categories to filter for
const categories = {
  'region': {
    name: 'Region',
    items: [] // get helper function to define this later
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
  }
}

// Define sorting choices
const sortOptions = {
  1: 'Name: A - Z',
  2: 'Name: Z - A',
  3: 'Rating: Low to High',
  4: 'Rating: High to Low',
}

function Coffees(props) {
  
  const {state} = useContext(DataContext);
  const coffees = Object.values(state.coffees);
  const reviews = state.reviews;
  
  // FilterArray to apply to coffees
  const [filters, setFilters] = useState({
    'region': [],
    'grain_species': [],
    'acidity': [],
    'roast': [],
  })
  const [filteredCoffees, setFilteredCoffees] = useState([])

  // makes sure all coffees are displayed on initial render
  useEffect(()=>{
    if(!filteredCoffees.length){
      setFilteredCoffees(prev=>coffees)
    }
  }, [filteredCoffees, coffees])

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
              <SortList
                sortOptions={sortOptions}
                />
              <FilterList 
                categories={categories}
                filters={filters}
                setFilters={setFilters}
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