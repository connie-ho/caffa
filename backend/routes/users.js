const express = require('express');
const router = express.Router();
const {
  getUserById,
  getUserByEmail,
  getUsers,
  editUser,
  addUser
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
  const { email, password } = req.body;

  getUserByEmail(email)
  .then(data => {
    const user = data
    console.log("backend DATA :", data)
    console.log("backend USER :", user)
    if (user.password === password) {
      console.log("ANOTHER ONE :", user)
      req.session.user_id = user.id;
      // res.cookie('user_id', userId)
      res.send({first_name: user.first_name, last_name:user.last_name, email: user.email, id: user.id})
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
  console.log("Backend Logout Post ======> ", req.session)
  req.session = null;
  res.send(null);
});

// Register user
router.post("/register", (req, res) => {
 
  const {email} = req.body
  getUserByEmail(email)
  .then(user => {
    if(!user) {
      addUser(req.body)
        .then(user => {
          console.log('in register', user)
          req.session.user_id = user.id; 
          res.send({first_name: user.first_name, last_name:user.last_name, email: user.email, id: user.id})
      })
    }
    else {
      res.status(400).json({ error: 'User already exists' })
    }
  })
  .catch((err) => res.status(500).json({error: err.message}))

});


// Edit user
router.patch("/edit", (req, res) => {
  const { first_name, last_name, email, password } = req.body
  currentUser = req.session.user_id;

  getUserById(id)
  .then(user => {
    editUser(req.body)
      .then(user => {
        console.log('in edit', user)
        res.send({first_name: first_name, last_name: last_name, email: email, password: password})
      })
    })
    .catch((err) => res.status(500).json({error: err.message}))
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
      res.send({first_name: data.first_name, last_name: data.last_name, email: data.email, id: data.id, avatar_url: data.avatar_url})
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