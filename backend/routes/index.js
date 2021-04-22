const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send('ok');
});

// router.get("/login", function (req, res, next) {
//   res.render("login", { title: "Express Login" });
// });

module.exports = router;
