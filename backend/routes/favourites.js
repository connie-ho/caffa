const express = require('express');
const router = express.Router();
const {
  getFavourites,
  getUserFavourites,
  addFavourite,
  deleteFavourite,
} = require("../db/helpers/favourite-queries");

// Show details of multiple favourites
router.get("/", (req, res) => {
  getFavourites()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.get("/user/:id", (req, res) => {
  console.log("backend userfavourites route", req)
  getUserFavourites(req)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Create a favourite
router.post("/", (req, res) => {
  addFavourite(req.body)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Delete a favourite
router.delete("/:id", (req, res) => {
  deleteFavourite(req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;