// load .env data into process.env
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cookieSession = require("cookie-session");

require('dotenv').config();
const dbHelpers = require('./helpers/dbHelpers')(db);

const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const cookieSession = require('cookie-session');

const app = express();
const db = require("./db");
db.connect();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const coffeesRouter = require("./routes/coffees");
const favouritesRouter = require("./routes/favourites");
const reviewsRouter = require("./routes/reviews");

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/coffees", coffeesRouter);
app.use("/api/favourites", favouritesRouter);
app.use("/api/reviews", reviewsRouter);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
  })
);


module.exports = app;
