
## Backend routes  
### Users, Coffees, Favourites, Reviews
___

## Users  
- /api/users/:user_id - GET - Show details of a user
- /api/users/:user_id - PATCH - Update a user (STRETCH)
- /api/users/:user_id - DELETE - Delete a user (STRETCH)
- /api/users - GET - Show details of multiple users (STRETCH)
- /api/users - POST - Create a user
- /api/users/login - POST - Login
- /api/users/register - POST - Register
- /api/users/authenticate - POST - Authenticate  
<br>
 > Notes on authenticate: authenticate users on first load of app with cookie. If user cookie exists, log them in automatically. If cookie doesn't exist or is invalid, act as if user is not logged in. This is needed because with react, if we refresh the page then we lose the state of current user.  
 
<br>  

## Coffees  
- /api/coffees - GET - Show details of multiple coffees
- /api/coffees - POST - Create a coffee
- /api/coffees/:coffee_id - GET - Show details of a coffee
- /api/coffees/:coffee_id - PATCH - Update a coffee (STRETCH)
- /api/coffees/:coffee_id - DELETE - Delete a coffee (STRETCH)

<br>

## Favourites  
- /api/favourites - GET - Show details of multiple favourites
- /api/favourites - POST - Create a favourite
- /api/favourites/:favourite_id - DELETE - Delete a favourite

<br>  

## Reviews
- /api/reviews - GET - Show details of multiple reviews
- /api/reviews/:review_id - PATCH - Update a review
- /api/reviews - POST - Create a review
- /api/reviews/:review_id - DELETE - Delete a review

<br>  

# Frontend routes (views)
The frontend views do NOT fetch data. the react components that conditionally render are responsible for making axios requests to fetch data from the api.

- / - Home Page
- /login - Login Page
- /register - Register Page
- /account - User Account Page
- /coffees - Filter Coffees Page
- /coffees/:id - Coffee/Product Page
- /add-coffee - Add A New Coffee Page
