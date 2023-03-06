const express = require("express");
const router = express.Router();
const {
  routerGetRestaurants,
  routerPostRestaurants,
  routerBanearOEnableRestaurant,
  routerGetByidRestaurants,
} = require("../Controllers/RestaurantsController");

/* This is a route that is being created. The first parameter is the path, the second is a callback
function that takes in a request and a response. The callback function is calling the
routerGetRestaurants function, which is defined in the RestaurantsController.js file. */
router.get("/", (req, res) => {
  routerGetRestaurants(req, res);
});

/* This is a route that is being created. The first parameter is the path, the second is a callback
function that takes in a request and a response. The callback function is calling the
routerPostRestaurants function, which is defined in the RestaurantsController.js file. */
router.post("/", (req, res) => {
  routerPostRestaurants(req, res);
});

/* This is a route that is being created. The first parameter is the path, the second is a callback
function that takes in a request and a response. The callback function is calling the
routerBanearOEnableRestaurant function, which is defined in the RestaurantsController.js file. */
router.post("/baneado/:id", (req, res) => {
  routerBanearOEnableRestaurant(req, res);
});

/* This is a route that is being created. The first parameter is the path, the second is a callback
function that takes in a request and a response. The callback function is calling the
routerGetByidRestaurants function, which is defined in the RestaurantsController.js file. */
router.get("/:id", (req, res) => {
  routerGetByidRestaurants(req, res);
});

module.exports = router;
