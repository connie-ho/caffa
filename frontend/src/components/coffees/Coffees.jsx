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
  1: 'Recommended',
  2: 'Name: A - Z',
  3: 'Name: Z - A',
  4: 'Rating: Low to High',
  5: 'Rating: High to Low',
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
    setFilteredCoffees(prev => [...res])
  }

  // sorts coffees by key
  const handleSort = (sortOption)=>{

    if(!sortOption || !filteredCoffees.length){
      return;
    }

    const newFilteredCoffees = filteredCoffees.sort((a, b) => {
      
      if(sortOption === 'Recommended'){
        return a.id - b.id
      }
      
      if(sortOption === 'Name: A - Z'){
        if(a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1 
        }

        if(a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1 
        }

        return 0;
      }

      if(sortOption === 'Name: Z - A'){
        if(a.name.toLowerCase() < b.name.toLowerCase()) {
          return 1
        }
        if(a.name.toLowerCase() > b.name.toLowerCase()) {
          return -1 
        }
        return 0;
      }
    })

    setFilteredCoffees(prev => [...newFilteredCoffees])

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
                handleSort={handleSort}
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