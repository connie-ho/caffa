// load .env data into process.env
require('dotenv').config();
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";

// const cors = require('cors');
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
// const sass       = require("node-sass-middleware");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cookieSession = require("cookie-session");

const app = express();

const db = require("./db");
// const dbHelpers = require('./helpers/dbHelpers')(db);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../frontend/public")));

// // Set up a whitelist and check against it:
// const whitelist = ['http://localhost:3001', 'http://localhost:3002', 'http://localhost:3005'];
// const corsOptions = {
//   origin: function(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// };

// // Then pass them to cors:
// app.use(cors(corsOptions));
// app.use(cors)
// const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const coffeesRouter = require("./routes/coffees");
const favouritesRouter = require("./routes/favourites");
const reviewsRouter = require("./routes/reviews");
const cafeRouter = require("./routes/cafes");
const searchRouter = require("./routes/search");

// app.use("/api/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/coffees", coffeesRouter);
app.use("/api/favourites", favouritesRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api/cafes", cafeRouter);
app.use("/api/search", searchRouter);

module.exports = app;
