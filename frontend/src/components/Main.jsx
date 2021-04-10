import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './Nav';
import Login from './Login';
import Home from './Home';
import Coffees from './coffees/Coffees';
import CoffeeList from './coffees/CoffeeList';
import CoffeeContext from '../contexts/CoffeeContext';
import ReviewContext from '../contexts/ReviewContext';

const Main = (props) => {

  const {state, setState} = props;

  return (
    <div>
      <Router>
        <Nav />

        <Switch>
          <CoffeeContext.Provider value={{coffees: state.coffees}}>
          <ReviewContext.Provider value={{reviews: state.reviews}}>
            <Route path="/coffees" >
              <Coffees />
            </Route>
          </ReviewContext.Provider>
          </CoffeeContext.Provider>
          <Route path="/login" >
            <Login />
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