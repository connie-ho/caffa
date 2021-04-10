import {Route, Switch} from 'react-router-dom';
import {useContext} from 'react';
import CoffeeContext from '../../contexts/CoffeeContext';
import CoffeeListItem from './CoffeeListItem';

const CoffeeList = (props) => {
  const {coffees} = useContext(CoffeeContext);
  // console.log(coffees)
  const coffeeList = coffees.map(coffee => {
    return (
      <CoffeeListItem
        key={coffee.id}
        coffee={coffee}
      />
    );
  })
  // const addCoffeeArray = Object.keys(props.coffees).map( coffee => {
  //   return props.coffees[coffee]
  // })

  return (
    <div>
      <Switch>
        <Route path="/coffees/:id">
        </Route>
        <Route path="/coffees">
          <h1>All Coffees</h1>
          {coffeeList}
         {/* {addCoffeeArray.map((coffee) => {
           return (
             <CoffeeListItem 
             key={coffee.id}
             coffee={coffee} 
             />
           )
         })} */}
        </Route>
      </Switch>
    </div>
  )
};

export default CoffeeList;