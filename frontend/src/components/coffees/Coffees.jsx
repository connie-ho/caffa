import {useState, useContext, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';

import DataContext from '../../contexts/DataContext';
import Coffee from '../coffee-id/Coffee';
import CoffeeList from './CoffeeList';
import SortFilterDrawer from './SortFilterDrawer';
import AddCoffeeButton from '../add-coffee/AddCoffeeButton';

import Footer from '../Footer'
import {formatRegions, getFilteredCoffees, hasSelectedFilters} from '../../helpers/selectors';

// styles
import classes from './Coffees.module.scss';

function Coffees(props) {
  
  const {state} = useContext(DataContext);
  const regions = Object.values(state.regions);
  const coffees = Object.values(state.coffees);

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

  // FilterArray to apply to coffees
  const [filters, setFilters] = useState({
    'region': [],
    'grain_species': [],
    'acidity': [],
    'roast': [],
  })
  const [filteredCoffees, setFilteredCoffees] = useState(coffees)
  const [hasFilters, setHasFilters] = useState(hasSelectedFilters(filters))
  
  // useEffect(()=>{
  //   setFilteredCoffees((prev)=>(Object.values(state.coffees)))
  // },[state.coffees])

  useEffect(()=>{

    const newHasFilters = hasSelectedFilters(filters);
    if(!newHasFilters){
      setFilteredCoffees((prev)=>(Object.values(state.coffees)))
    }
    setHasFilters(prev => newHasFilters);

  }, [hasFilters, state.coffees, filters])

  const handleFilters = (filters)=>{
    // pass in a copy of the filters
    const copyFilters = {...filters};
    const res = getFilteredCoffees(coffees, categories, copyFilters)
    setFilteredCoffees(prev => res)

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
          <Footer />
        </Route>
        <Route path="/coffees">
      
          <div
            className={classes["coffees-page"]}
          >
            <SortFilterDrawer
              sortOptions={sortOptions}
              handleSort={handleSort}
              categories={categories} 
              filters={filters}
              setFilters={setFilters}
              handleFilters={handleFilters}
            />
            {!filteredCoffees.length && <h1>There doesn't seem to be any results, try our image search instead</h1>}
            <div style={{width:'100%', display: 'flex', flexDirection: 'column', minHeight:'90vh'}}>
            <CoffeeList
              coffees={filteredCoffees}
            />
            <Footer />
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  );
};
  
export default Coffees;