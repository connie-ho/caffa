const express = require("express");
const router = express.Router();
const {
  getReviews,
  addReview,
  editReview,
  deleteReview
} = require("../db/helpers/review-queries");

router.get("/", (req, res) => {
  getReviews()
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

  addReview(req.body)
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.patch("/:id", (req, res) => {
  // uncomment when user routes are done
  // const userId = req.session.user_id;

  // if (!userId) {
  //   res.send('Not logged in!');
  //   return;
  // }

  editReview({...req.body, ...req.params})
    .then(data => res.status(201).json(data))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.delete("/:id", (req, res) => {
  // uncomment when user is known
  // const userId = req.session.user_id;

  // if (!userId) {
  //   res.send('Not logged in!');
  //   return;
  // }

  deleteReview(req.params.id)
    .then(data => res.send(data))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
