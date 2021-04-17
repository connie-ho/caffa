import {useState, useContext, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';

import DataContext from '../../contexts/DataContext';
import Coffee from '../coffee-id/Coffee';
import CoffeeList from './CoffeeList';
import FilterList from './FilterList';
import SortList from './SortList';

import {formatRegions, getFilteredCoffees, getRegions, hasSelectedFilters} from '../../helpers/selectors';

// styles
import './Coffees.scss';

function Coffees(props) {
  
  const {state} = useContext(DataContext);
  const regions = Object.values(state.regions);

  // Define categories to filter for
  const categories = {
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
      'region': {
        name: 'Region',
        items: formatRegions(regions, 11) // get helper function to define this later
      },
  }
  // Define sorting choices
  const sortOptions = {
    1: 'Recommended',
    2: 'Name: A - Z',
    3: 'Name: Z - A',
    4: 'Rating: Low to High',
    5: 'Rating: High to Low',
  }
  const coffees = Object.values(state.coffees);

  // FilterArray to apply to coffees
  const [filters, setFilters] = useState({
    'region': [],
    'grain_species': [],
    'acidity': [],
    'roast': [],
  })
  const [filteredCoffees, setFilteredCoffees] = useState([...coffees])
  const [hasFilters, setHasFilters] = useState(hasSelectedFilters(filters))


  const handleFilters = (filters)=>{
    const res = getFilteredCoffees(coffees, categories, filters)
    setFilteredCoffees(prev => [...res])

    // if there are no filters selected, display all
    const newHasFilters = hasSelectedFilters(filters);
    if(!newHasFilters){
      setFilteredCoffees(prev => coffees)
    }

    setHasFilters(prev => newHasFilters)
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

      if(sortOption === 'Rating: Low to High'){
        return a.avg_rating - b.avg_rating
      }

      if(sortOption === 'Rating: High to Low'){
        return b.avg_rating - a.avg_rating
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