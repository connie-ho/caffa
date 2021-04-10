import Main from './components/Main';
import "./App.css";

import useApplicationData from './hooks/useApplicationData';

function App() {

  const {users, coffees, reviews, favourites, setUsers, setCoffees, setFavourites, setReviews} = useApplicationData();

  return (
    <div className="App">
      <Main 
        users={users}
        coffees={coffees}
        reviews={reviews}
        favourites={favourites}
        setUsers={setUsers}
        setCoffees={setCoffees}
        setFavourites={setFavourites}
        setReviews={setReviews}
      />
    </div>
  );
}

export default App;
