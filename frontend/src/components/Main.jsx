import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './Nav';
import Login from './Login';
import Home from './Home';
import Coffees from './coffees/Coffees';
import CoffeeContext from '../contexts/CoffeeContext';
import UserContext from '../contexts/UserContext';
import ReviewContext from '../contexts/ReviewContext';

const Main = (props) => {
  const {loginHandler} = props
  console.log("IN MAIN")
  console.log("PROPS :", props)

  return (
    <div>
      <Router>
        <Nav />

        <Switch>
          <Route path="/coffees" >
            <Coffees />
          </Route>
          <Route path="/login" >
            <Login loginHandler={loginHandler}/>
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
