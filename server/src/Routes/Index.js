const { Router } = require("express");
const router = Router();

const routerUser = require("./Users");

router.use("/users", routerUser);

module.exports = router;
