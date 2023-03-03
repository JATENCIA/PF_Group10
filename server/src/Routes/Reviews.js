const express = require("express");
const { routerGetReview } = require("../Controllers/ReviewController");
const router = express.Router();

router.get("/", (req, res) => {
  routerGetReview(req, res);
});

module.exports = router;
