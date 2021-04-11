const express = require('express');
const router = express.Router();
const {
  getUser,
  getUserByEmail,
  getUsers
} = require("../db/helpers/user-queries");

router.get("/", (req, res) => {
  getUsers()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Show details of a user
router.get("/:id", (req, res) => {
  const userId = Number(req.params);

  getUser(userId)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// const userId = req.session.user_id;
// Create a user
router.post("/", (req, res) => {
  res.send("ok")
});

// Login user
router.post("/login", (req, res) => {

  getUserByEmail(req.body.email)
  .then((data) => res.status(200).json(data))
  .catch((err) => res.status(500).json({ error: err.message }));
});

// Register user
router.post("/register", (req, res) => {
  res.send("ok")
});

// Authenticate user
router.post("/authenticate", (req, res) => {
  res.send("ok")
});

module.exports = router;