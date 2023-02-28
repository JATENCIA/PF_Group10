const express = require("express");
const router = express.Router();

const routerUser = require("./Users");

router.use("/users", routerUser);

module.exports = router;
