const express = require("express");
const router = express.Router();
const {
  routerGetUser,
  routerPostUser,
  routerPostSignin,
  routerGetFavorite,
  routerGetByidUser,
  routerBanearOEnableUser,
} = require("../Controllers/UsersController");

/* This is a route that is being created. The first argument is the path, the second is a callback
function that takes in a request and response object. The callback function is calling the
routerGetFavorite function which is imported from the usersController.js file. */
router.post("/favorite", (req, res) => {
  routerGetFavorite(req, res);
});

/* This is a route that is being created. The first argument is the path, the second is a callback
function that takes in a request and response object. The callback function is calling the
routerGetUser function which is imported from the usersController.js file. */
router.get("/", (req, res) => {
  routerGetUser(req, res);
});

/* This is a route that is being created. The first argument is the path, the second is a callback
function that takes in a request and response object. The callback function is calling the
routerGetByidUser function which is imported from the usersController.js file. */
router.get("/:id", (req, res) => {
  routerGetByidUser(req, res);
});

/* This is a route that is being created. The first argument is the path, the second is a callback
function that takes in a request and response object. The callback function is calling the
routerPostUser function which is imported from the usersController.js file. */
router.post("/", (req, res) => {
  routerPostUser(req, res);
});

/* This is a route that is being created. The first argument is the path, the second is a callback
function that takes in a request and response object. The callback function is calling the
routerPostSignin function which is imported from the usersController.js file. */
router.post("/singin", (req, res) => {
  routerPostSignin(req, res);
});

/* This is a route that is being created. The first argument is the path, the second is a callback
function that takes in a request and response object. The callback function is calling the
routerBanearOEnableUser function which is imported from the usersController.js file. */
router.post("/baneado/:id", (req, res) => {
  routerBanearOEnableUser(req, res);
});

module.exports = router;
