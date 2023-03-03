const Restaurants = require("../Models/Restaurants");
const Users = require("../Models/Users");

/**
 * It's a function that returns a promise that resolves to an array of restaurants
 * @param req - The request object represents the HTTP request and has properties for the request query
 * string, parameters, body, HTTP headers, and so on.
 * @param res - the response object
 */
const routerGetRestaurants = async (req, res) => {
  try {
    let restaurant = [];
    const { nameProduct } = req.query;
    const { nameRestaurant } = req.query;
    const restaurants = await Restaurants.find({})
      .populate("user", {
        name: 1,
        image: 1,
        lastName: 1,
        dni: 1,
        eMail: 1,
        location: 1,
        telephone: 1,
      })
      .populate("product", {
        name: 1,
        price: 1,
        image: 1,
        discount: 1,
        description: 1,
      })
      .populate("review", { description: 1, rate: 1 });
    if (nameProduct) {
      restaurants.map((elem) => {
        let boolean = true;
        elem.product?.forEach((product) => {
          if (boolean) {
            if (
              product.name.toLowerCase().includes(nameProduct.toLowerCase())
            ) {
              restaurant.push(elem);
              boolean = false;
            }
          }
        });
      });

      restaurant.length
        ? res.status(200).json(restaurant)
        : res.status(201).json("the restaurant doesn't exist");
    } else res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ messaje: `${error}` });
  }
};

/**
 * It creates a new restaurant and saves it to the database
 * @param req - The request object.
 * @param res - The response object.
 */
const routerPostRestaurants = async (req, res) => {
  try {
    const restaurant = req.body;
    const user = await Users.findById(restaurant.user);
    console.log(
      "🚀 ~ file: RestaurantsController.js:39 ~ routerPostRestaurants ~ user:",
      user
    );

    const newRestaurant = new Restaurants({
      name: restaurant.name,
      image:
        restaurant.image ||
        "https://st2.depositphotos.com/1496387/10725/v/600/depositphotos_107251736-stock-illustration-restaurant-vector-logo-diner-cafe.jpg",
      eMail: restaurant.eMail,
      location: restaurant.location,
      telephone: restaurant.telephone,
      user: user._id,
    });

    const saveRestaurant = await newRestaurant.save();

    user.restaurant = user.restaurant.concat(saveRestaurant._id);
    await user.save();

    res.status(200).json("successfully created restaurant");
  } catch (error) {
    res.status(500).json({ messaje: `${error}` });
  }
};

module.exports = { routerGetRestaurants, routerPostRestaurants };
