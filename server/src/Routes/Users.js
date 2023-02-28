const express = require("express");
const router = express.Router();
const { routerGetUser } = require("../Controllers/usersController");

router.get("/", (req, res) => {
  routerGetUser(req, res);
});

module.exports = router;
