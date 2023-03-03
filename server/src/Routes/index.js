const { Router } = require("express");
const router = Router();

const routerUser = require("./Users");
const routerReview = require("./Reviews");
const routerProduct = require("./Products");
const routerRestaurants = require("./Restaurants");

router.use("/users", routerUser);
router.use("/review", routerReview);
router.use("/products", routerProduct);
router.use("/restaurants", routerRestaurants);

module.exports = router;
