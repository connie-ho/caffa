import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './Nav';
import Login from './Login';
import Home from './Home';
import CoffeeList from './coffees/CoffeeList';
import CoffeeContext from '../contexts/CoffeeContext';
import { UserContext } from '../contexts/UserContext';

const Main = (props) => {

  const {state, setState} = props;
  console.log("PROPS:", props)

  return (
    <div>
      <Router>
        <Nav />

        <Switch>
          <CoffeeContext.Provider value={{coffees: state.coffees, setState}}>
            <Route path="/coffees" >
              <CoffeeList/>
            </Route>
          </CoffeeContext.Provider>
          <UserContext.Provider value={{users: state.users, setState}}>
            <Route path="/login" >
              <Login />
            </Route>
          </UserContext.Provider>
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