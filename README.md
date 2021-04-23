## Caffa 

Welcome to Caffa!

Caffa is a community-driven platform for coffee lovers all around the world. Search your favourite Coffee through our image search to learn more details about the coffee itself, what others are saying about it and where you can find it at your local shops.

This project was developed by <a href="https://github.com/connie-ho">Connie Ho</a>, <a href="https://github.com/Justin1002">Justin Ly</a>, and <a href="https://github.com/dattphan15">Kevin Phan</a>


## Final Product

___  

#### Home Page
!["GIF of Home Page"](https://github.com/connie-ho/caffa/blob/master/docs/screenshots/homepage-scroll.gif?raw=true)

#### Image Search
!["GIF of image search"](https://github.com/connie-ho/caffa/blob/master/docs/screenshots/image-search.gif?raw=true)

#### Coffee Page Interactions
!["Screenshot of Coffee Page Interactions"](https://github.com/connie-ho/caffa/blob/master/docs/screenshots/05-caffa.gif)

## Home Page Desktop
!["Screenshot of Home Page"](https://github.com/connie-ho/caffa/blob/master/docs/screenshots/01-home.png?raw=true)

#### Browse Coffees
!["Screenshot of Browse Coffees"](https://github.com/connie-ho/caffa/blob/master/docs/screenshots/03-browse-coffee.png)

#### Coffee Details
!["Screenshot of Coffee Details"](https://github.com/connie-ho/caffa/blob/master/docs/screenshots/04-coffee.png)




## Initial Setup


To run the following project on your machine please follow the steps below:  



### Backend setup:

1. Create an <code> .env </code> in the main backend directory where you'll be providing the required API Keys. 

2. Obtain an API key from **<a href="https://cloud.google.com/vision/docs/setup">Google Vision </a>** (for image scanning recognition) and **<a href="https://www.yelp.ca/fusion">Yelp Fusion</a>** ( for recommended local cafes). Place these in the ```.env ``` file you created in the backend. 
You will need to use the same Google Vision API Key for the Frontend setup as well so keep this handy for now.


### Frontend setup:

3. Create an <code> .env </code> in the main frontend directory where you'll be providing the required API Keys. 

4. Take the **Google Vision** API key you obtained earlier for the backend setup and put this in the .env file. 

5. Visit **<a href="https://firebase.google.com/docs/storage">Firebase</a>** and obtain an API key and put this in the .env file as well.


## Getting Started 

1. Install all frontend dependencies while in the main frontend directory.
```
npm install
```

2. Install all backend dependencies while in the main backend directory.

```
npm install
```

3. Reset the database.

```
npm run db:reset
```

4. Run the server for the frontend and backend.
```
npm start
```

5. Lastly, visit the website on your localhost.
```
http://localhost:3002/
```

## Dependencies

- axios: ^0.21.1,
- bcrypt: ^5.0.1,
- body-parser: ^1.18.3,
- cookie-parser: ~1.4.4,
- cookie-session: ^1.4.0,
- debug: ~2.6.9,
- express: ~4.16.1,
- morgan: ~1.9.1,
- pg: ^8.5.1,
- pg-native: ^3.0.0,
- yelp-fusion: ^3.0.0

## Future Features

- User interactions such as following other users.
- Integrated marketplace to buy and sell coffee on Caffa.
- Admin dashboard to manage new coffee entries by customers to retain consistency with existing records in the database.



## Known Issues/Bugs
- Filtering not on page 1 can cause errors
- Distance is inaccurate on yelp maps
- Google Vision API sometimes displays errors
