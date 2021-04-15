const express = require("express");
const router = express.Router();
const {
  getCoffees,
  getMostFavouritedCoffees,
  getCoffee,
  addCoffee,
} = require("../db/helpers/coffee-queries");

router.get("/", (req, res) => {
  console.log('get coffees route')
  console.log(req.params)
  getCoffees()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.get("/popular", (req, res) => {
  console.log("popular route")
  getMostFavouritedCoffees()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.get("/:id", (req, res) => {
  const coffeeId = Number(req.params.id);

  getCoffee(coffeeId)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.post("/", (req, res) => {

  addCoffee(req.body)
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
