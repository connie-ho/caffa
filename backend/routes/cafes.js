const express = require("express");
const router = express.Router();

const {getCafeData} = require('../db/helpers/yelp-queries');


router.get("/", (req, res) => {

  console.log(req.params.query)

  getCafeData(req.params.query)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;