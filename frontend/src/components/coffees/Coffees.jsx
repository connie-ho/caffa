import {useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import FilterList from './FilterList';
import CoffeeList from './CoffeeList';
import Coffee from '../coffee-id/Coffee';

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
    items: [{id: 1, type:'Arabica'}, {id: 2, type: 'Robusta'}]},
  'acidity': {
    name: 'Acidity',
    items: [{id: 3, type:'Low'}, {id: 4, type:'Low-Medium'}, {id: 5, type:'Medium'}, {id: 6, type:'Medium-High'}, {id: 7, type:'High'}]
  },
  'roast': {
    name: 'Roast',
    items: [{id: 8, type:'Light'}, {id: 9, type: 'Medium'},{id: 10, type: 'Dark'}]
  },
  'rating': {
    name: 'Rating',
    items: [{id: 11, type:1}, {id: 12, type:2}, {id: 13, type:3}, {id: 14, type:4}, {id: 15, type:5}]
  }
}

const handleFilters = (filters, category)=>{
  console.log(filters);
  console.log(category);
}


function Coffees(props) {
  // FilterArray to apply to coffees
  const [filters, setFilters] = useState([])
  console.log(filters)
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
                filters={filters}
                setFilters={setFilters}
                handleFilters={handleFilters}
              />
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