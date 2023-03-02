const express = require("express");
const {
  routerGetProducts,
  routerPostProdusct,
} = require("../Controllers/ProductsController");
const router = express.Router();

/* This is a route that is being created. The first parameter is the path, the second is a callback
function that takes in a request and response object. The callback function is calling the
routerGetProducts function which is defined in the ProductsController.js file. */
router.get("/", (req, res) => {
  routerGetProducts(req, res);
});

/* This is a route that is being created. The first parameter is the path, the second is a callback
function that takes in a request and response object. The callback function is calling the
routerPostProdusct function which is defined in the ProductsController.js file. */
router.post("/", (req, res) => {
  routerPostProdusct(req, res);
});

module.exports = router;
