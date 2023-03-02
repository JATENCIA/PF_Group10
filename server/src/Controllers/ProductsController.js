const Products = require("../Models/Products");
const Restaurants = require("../Models/Restaurants");
/**
 * It's a function that receives a request and a response, and it returns a list of products
 * @param req - The request object represents the HTTP request and has properties for the request query
 * string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 */

const routerGetProducts = async (req, res) => {
  try {
    const { name } = req.query;
    const products = await Products.find({});

    if (name) {
      let product = products.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      );
      product.length
        ? res.status(200).json(product)
        : res
            .status(201)
            .json({ messaje: "sorry, this option is not available" });
    } else res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ messaje: `${error}` });
  }
};

/**
 * It creates a new product and adds it to the restaurant's product array
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
const routerPostProdusct = async (req, res) => {
  try {
    const product = req.body;
    const restaurant = await Restaurants.findById(product.restaurant);

    const newProduct = new Products({
      name: product.name,
      image: product.image,
      price: product.price,
      discount: product.discount,
      restaurant: restaurant._id,
      description: product.description,
    });

    const saveProduct = await newProduct.save();
    restaurant.product = restaurant.product.concat(saveProduct._id);
    await restaurant.save();
    res.status(200).json({ messaje: "product created successfully" });
  } catch (error) {
    res.status(500).json({ messaje: `${error}` });
  }
};

module.exports = { routerGetProducts, routerPostProdusct };
