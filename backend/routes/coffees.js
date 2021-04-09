const express = require('express');
const router  = express.Router();
const {getCoffees} = require('../db/helpers/coffee-queries');

router.get("/", (req, res) => {
  
  getCoffees()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ error: err.message }));
  

});

module.exports = router;
