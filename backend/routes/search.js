const express = require("express");
const router = express.Router();
const {getGoogleImageRecognition} = require('../db/helpers/google-queries');

router.post("/", (req, res) => {
  const {body} = req.body

  getGoogleImageRecognition(body)
    .then((data) => {
      return res.status(200).json(data)})
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;