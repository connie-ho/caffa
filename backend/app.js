const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cookieSession = require("cookie-session");

// seperated routes for each resources
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const coffeesRouter = require("./routes/coffees");
const reviewsRouter = require("./routes/reviews");

const app = express();

const db = require("./db");

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

// resource routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/coffees", coffeesRouter);
app.use("/api/reviews", reviewsRouter);

module.exports = app;
