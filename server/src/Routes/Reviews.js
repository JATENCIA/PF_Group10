const express = require("express");
const {
  routerGetReview,
  routerPostReview,
  routerGetByidReview,
  routerBanearOEnableReview,
} = require("../Controllers/ReviewController");
const router = express.Router();

/* This is a route handler. It is a function that is called when a request is made to the specified
route. */
router.get("/", (req, res) => {
  routerGetReview(req, res);
});

/* This is a route handler. It is a function that is called when a request is made to the specified
route. */
router.post("/", (req, res) => {
  routerPostReview(req, res);
});

/* This is a route handler. It is a function that is called when a request is made to the specified
route. */
router.get("/:id", (req, res) => {
  routerGetByidReview(req, res);
});

/* A route handler. It is a function that is called when a request is made to the specified
route. */
router.post("/baneado/:id", (req, res) => {
  routerBanearOEnableReview(req, res);
});

module.exports = router;
