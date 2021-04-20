const express = require("express");
const router = express.Router();
const {getGoogleImageRecognition} = require('../db/helpers/google-queries');

router.post("/", (req, res) => {
  console.log('body', req.body)
  const {body} = req.body

  getGoogleImageRecognition(body)
    .then((data) => {
      console.log('data sent back', data)
      return res.status(200).json(data)})
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;