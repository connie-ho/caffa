const express = require('express');
const router = express.Router();
const {
  getUserByID,
  getUsers,
  getUserByEmail,
  addUser,
  getUsersPosts
} = require("../db/helpers/user-queries");


// Show details of a user
router.get(":id", (req, res) => {
  const userId = Number(req.params.id);
  // const userId = req.session.user_id;

  getUserByID(userId)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Create a user
router.post("/", (req, res) => {
  res.send("ok")
})

// Login user
router.post("/login", (req, res) => {
  res.send("ok")
})

// Register user
router.post("/register", (req, res) => {
  res.send("ok")
})

// Authenticate user
router.post("/authenticate", (req, res) => {
  res.send("ok")
})

module.exports = router;