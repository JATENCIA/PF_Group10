const { Router } = require("express");
const router = Router();
const { routerGetUser } = require("../Controllers/usersController");

router.get("/", routerGetUser);

module.exports = router;
