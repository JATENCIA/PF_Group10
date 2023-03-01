
const express = require("express");
const router = express.Router();
const {
  routerGetUser,
  routerPostUser,
  routerPostSignin,
} = require("../Controllers/UsersController");

/* This is a route that is being created. The first argument is the path, the second is a callback
function that takes in a request and response object. The callback function is calling the
routerGetUser function which is imported from the usersController.js file. */
router.get("/", (req, res) => {
  routerGetUser(req, res);
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

module.exports = router;
