const Reviews = require("../Models/Reviews");
const Users = require("../Models/Users");
const Restaurants = require("../Models/Restaurants");

/**
 * It's a function that returns a promise that resolves to an array of reviews
 * @param req - The request object represents the HTTP request and has properties for the request query
 * string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 */
const routerGetReview = async (req, res) => {
  try {
    const review = await Reviews.find({})
      .populate("user", {
        name: 1,
        lastName: 1,
        eMail: 1,
        telephone: 1,
        dni: 1,
      })
      .populate("restaurant");
    res.status(200).json(review);
  } catch (error) {
    res.status(500).send({ messaje: `${error}` });
  }
};

/**
 * It creates a new review, saves it, and then adds the review to the user and restaurant
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
const routerPostReview = async (req, res) => {
  try {
    // validateCreate;
    // let boolean = await validateReview(req, res);

    const review = req.body;
    const user = await Users.findById(review.user);
    console.log(
      "🚀 ~ file: ReviewController.js:41 ~ routerPostReview ~ user:",
      user
    );
    const restaurant = await Restaurants.findById(review.restaurant);
    console.log(
      "🚀 ~ file: ReviewController.js:43 ~ routerPostReview ~ restaurant:",
      restaurant
    );

    const newReview = new Reviews({
      description: review.description,
      rate: review.rate,
      user: user._id,
      restaurant: restaurant._id,
    });

    const saveReview = await newReview.save();
    user.review = user.review.concat(saveReview._id);
    await user.save();
    restaurant.review = restaurant.review.concat(saveReview._id);
    await restaurant.save();
    res.status(200).json(saveReview);
  } catch (error) {
    res.status(500).send({ messaje: `${error}` });
  }
};

/**
 * It's a function that receives a request and a response, and it tries to find a review by its id, and
 * if it finds it, it sends it back to the client, otherwise it sends a message saying that it couldn't
 * find it
 * @param req - The request object represents the HTTP request and has properties for the request query
 * string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 */
const routerGetByidReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Reviews.findById({ _id: id })
      .populate("user", {
        name: 1,
        lastName: 1,
        eMail: 1,
        telephone: 1,
        dni: 1,
      })
      .populate("restaurant", {
        name: 1,
        image: 1,
        eMail: 1,
        location: 1,
        telephone: 1,
        product: 1,
      });

    review
      ? res.status(200).json(review)
      : res.status(201).json({ messaje: "review can't find sorry" });
  } catch (error) {
    res.status(500).send({ messaje: `${error}` });
  }
};

/**
 * It allows you to enable or disable a review.
 * @param req - request
 * @param res - response
 */
const routerBanearOEnableReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Reviews.findById({ _id: id });
    let baneado = review.baneado;
    if (review) {
      if (baneado === false) baneado = true;
      else baneado = false;
    } else
      res.status(201).json({
        message: "the review you are trying to search for does not exist",
      });
    await Reviews.updateOne({ _id: id }, { $set: { baneado } });

    baneado
      ? res.status(200).json({
          message: "The review is temporarily or permanently disabled.",
        })
      : res.status(200).json({ message: "the review is enabled" });
  } catch (error) {
    res.status(500).json({ messaje: `${error}` });
  }
};

module.exports = {
  routerGetReview,
  routerPostReview,
  routerGetByidReview,
  routerBanearOEnableReview,
};
