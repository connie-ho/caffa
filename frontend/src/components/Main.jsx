import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './Nav';
import Login from './Login';
import Home from './Home';
import CoffeeList from './coffees/CoffeeList';
import CoffeeContext from '../contexts/CoffeeContext';
import UserContext from '../contexts/UserContext';
import ReviewContext from '../contexts/ReviewContext';

const Main = (props) => {

  const {state, setState} = props;
  console.log("PROPS:", props)

  return (
    <div>
      <Router>
        <Nav />

        <Switch>
          <CoffeeContext.Provider value={{coffees: state.coffees}}>
          <ReviewContext.Provider value={{reviews: state.reviews}}>
            <Route path="/coffees" >
              <CoffeeList/>
            </Route>
          </ReviewContext.Provider>
          </CoffeeContext.Provider>
          <Route path="/login" >
            {/* <Login /> */}
            <h1>HELLO</h1>
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