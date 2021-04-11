const express = require('express');
const router = express.Router();
const {
  getUserById,
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
  .then(data => {
    const user = data
    console.log("DATA :", data)
    console.log("USER :", user)
    if (user) {
      console.log("ANOTHER ONE :", user)
      req.session.user_id = user.id;
      // res.cookie('user_id', userId)
      res.json({ user })
    } else {
      res.json({result: "Wrong email/password"})
    }
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
  });
});

// LOGOUT
router.post('/logout', (req, res) => {
  req.session = null;
  res.redirect("/");
});

// Register user
router.post("/register", (req, res) => {
  res.send("ok")
});

// Authenticate user
router.post("/authenticate", (req, res) => {
  const userId = req.session.user_id;
  console.log("AUTHEN POST USER ID :", userId);
  getUserById(userId)
  .then(data => {
    console.log("DATA :", data)
    console.log("DATA ID:", data.id)
    if (data) {
      console.log("THE /AUTHENTICATE POST COOKIE =============>")
      res.send(data)
    } else {
    res.json(null)
    }
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
  });
});

module.exports = router;