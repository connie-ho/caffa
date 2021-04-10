const express = require('express');
const router = express.Router();

// Show details of multiple favourites
router.get("/", (req, res) => {
  res.send("ok")
})

// Create a favourite
router.post("/", (req, res) => {
  res.send("ok")
})

// Delete a favourite
router.post("/:id", (req, res) => {
  res.send("ok")
})

module.exports = router;