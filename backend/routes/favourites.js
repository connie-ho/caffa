const express = require('express');
const favourites = express.Router();

// Show details of multiple favourites
favourites.get("/", (req, res) => {
  res.send("ok")
})

// Create a favourite
favourites.post("/", (req, res) => {
  res.send("ok")
})

// Delete a favourite
favourites.post("/:favourite_id", (req, res) => {
  res.send("ok")
})

module.exports = favourites;