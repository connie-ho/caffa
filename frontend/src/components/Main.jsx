import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Coffees from './Coffees';

const Main = () => {
  return (
    <div>
      <Router>
        <Nav />

        <Switch>
          <Route path="/coffees" >
            <Coffees />
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