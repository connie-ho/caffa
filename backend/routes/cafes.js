const express = require("express");
const router = express.Router();

const {getCafeData} = require('../db/helpers/yelp-queries');


router.get("/", (req, res) => {

  const ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  const query = req.query.brand.split("+").join(" ");

  getCafeData(query, ip)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;