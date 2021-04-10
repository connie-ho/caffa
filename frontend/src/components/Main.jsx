import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import CoffeeList from './coffees/CoffeeList';

const Main = (props) => {


  return (
    <div>
      <Router>
        <Nav />

        <Switch>
          <Route path="/coffees" >
            <CoffeeList />
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