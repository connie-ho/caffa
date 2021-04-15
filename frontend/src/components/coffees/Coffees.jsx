import {useState, useContext, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';

import DataContext from '../../contexts/DataContext';
import FilterList from './FilterList';
import CoffeeList from './CoffeeList';
import Coffee from '../coffee-id/Coffee';

import {getFilteredCoffees, hasFilters} from '../../helpers/selectors';

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
  })
  const [filteredCoffees, setFilteredCoffees] = useState(coffees)

  const handleFilters = (filters)=>{
    const res = getFilteredCoffees(coffees, categories, filters)
    setFilteredCoffees(prev => res)
  }

  // this makes sure if there are no filters, all coffees are displayed
  useEffect(()=>{

    if(!hasFilters(filterCat)){
      setFilteredCoffees(prev => coffees)
    }

  },[filterCat, coffees])
  

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