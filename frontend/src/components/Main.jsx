import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import CoffeeList from './coffees/CoffeeList';

const Main = (props) => {

  console.log(props.coffees)
  return (
    <div>
      <Router>
        <Nav />

        <Switch>
          <Route path="/coffees" >
            <CoffeeList coffees={props.coffees}/>
          </Route>
          <Route path="/image-search">
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  )
};

export default Main;