const express = require("express");
const router = express.Router();
const {
  getCoffees,
  getCoffee,
  addCoffee,
} = require("../db/helpers/coffee-queries");

router.get("/", (req, res) => {
  getCoffees()
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
  // uncomment when user routes are done
  // const userId = req.session.user_id;

  // if (!userId) {
  //   res.send('Not logged in!');
  //   return;
  // }

  addCoffee(req.body)
    .then((data) => {
      console.log('data sent', data)
      return res.status(201).json(data)})
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
