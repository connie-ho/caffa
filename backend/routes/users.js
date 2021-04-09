const express = require('express');
const users = express.Router();


// Create a user
users.post("/", (req, res) => {
  res.send("ok")
})

// Show details of a user
users.get("/:user_id", (req, res) => {
  res.send("ok")
})

// Login user
users.post("/login", (req, res) => {
  res.send("ok")
})

// Register user
users.post("/register", (req, res) => {
  res.send("ok")
})

// Authenticate user
users.post("/authenticate", (req, res) => {
  res.send("ok")
})

module.exports = users;