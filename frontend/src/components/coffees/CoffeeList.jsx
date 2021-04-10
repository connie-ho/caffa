import {Route, Switch} from 'react-router-dom';
import CoffeeListItem from './CoffeeListItem';

const CoffeeList = (props) => {
  console.log('coffeelist called', props.coffees )
  const addCoffeeArray = Object.keys(props.coffees).map( coffee => {
    return props.coffees[coffee]
  })

  return (
    <div>
      <Switch>
        <Route path="/coffees/:id">
        </Route>
        <Route path="/coffees">
          <h1>All Coffees</h1>
         {addCoffeeArray.map((coffee) => {
           return (
             <CoffeeListItem coffee={coffee} />
           )
         })}
        </Route>
      </Switch>
    </div>
  )
};

export default CoffeeList;