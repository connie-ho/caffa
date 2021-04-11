import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Nav from './Nav';
import Login from './Login';
import Home from './Home';
import Coffees from './coffees/Coffees';
import UserContext from '../contexts/UserContext';


const Main = (props) => {

  const {addFavourite} = props;
  
  return (
    <div>
      <Router>
        <Nav />

        <Switch>
          <Route path="/coffees" >
            <Coffees 
              addFavourite={addFavourite}
            />
          </Route>
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
