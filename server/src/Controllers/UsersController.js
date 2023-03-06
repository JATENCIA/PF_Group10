const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../Models/Users");
const userSchema = require("../Models/Users");
const Restaurants = require("../Models/Restaurants");
const { generarAleatorios } = require("../Password/password");

/**
 * It takes the email and password from the request body, checks if the user exists, if the user
 * exists, it checks if the password is correct, if the password is correct, it creates a token and
 * sends it back to the user
 * @param req - The request object.
 * @param res - The response object.
 * @returns The user's email and id are being returned.
 */
const routerPostSignin = async (req, res) => {
  try {
    const { eMail, password } = req.body;
    const oldUser = await Users.find({ eMail: eMail });
    if (!oldUser.length)
      return res.status(404).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcryptjs.compareSync(
      password,
      oldUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      process.env.SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ oldUser, token });
  } catch (error) {
    res.status(500).json({ messaje: `${error}` });
  }
};

/**
 * It gets all the users from the database and returns them in the response
 * @param req - The request object represents the HTTP request and has properties for the request query
 * string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 */
const routerGetUser = async (req, res) => {
  try {
    const { dni } = req.query;
    const users = await Users.find().populate("review", {
      description: 1,
      rate: 1,
      restaurant: 1,
    });

    if (dni) {
      let userDni = users.filter((user) => user.dni === Number(dni));
      userDni.length
        ? res.status(200).json(userDni)
        : res.status(201).json("Not found");
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json({ messaje: `${error}` });
  }
};

/**
 * It creates a new user, encrypts the password, saves the user in the database, and sends a
 * confirmation email
 * @param req - The request object. This object represents the HTTP request and has properties for the
 * request query string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 */
const routerPostUser = async (req, res) => {
  try {
    // validateCreate;
    //validateUser(req, res);
    const user = userSchema(req.body);
    /* Generating a random password. */
    const pass = generarAleatorios();

    let passwordHash;
    /* If the user has a password, it encrypts it. */
    if (user.password.length) {
      passwordHash = await bcryptjs.hash(user.password, 12);
    }
    /* Encrypting the password. */
    let passdHash = await bcryptjs.hash(pass, 12);

    const newUser = await new Users({
      dni: user.dni,
      name: user.name,
      eMail: user.eMail,
      image: user.image || "http://cdn.onlinewebfonts.com/svg/img_141364.png",
      password: passwordHash || passdHash,
      lastName: user.lastName,
      telephone: user.telephone,
    });
    const saveUser = await newUser.save();
    const token = jwt.sign(
      { email: saveUser.email, id: saveUser._id },
      process.env.SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ saveUser, token });
    //eMail1(user.eMail);
  } catch (error) {
    res.status(500).json({ messaje: `${error}` });
  }
};

/**
 * It takes the id of a restaurant and the eMail of a user, then it checks if the restaurant is already
 * in the user's favorites list, if it is, it removes it, if it isn't, it adds it
 * @param req - The request object.
 * @param res - The response object.
 */
const routerGetFavorite = async (req, res) => {
  try {
    const { id, eMail } = req.body;
    let users = await Users.find({ eMail: eMail });
    let restaurant = await Restaurants.findById({ _id: id });
    let favorites = users[0].favorites;

    let flag = [];
    if (favorites) {
      favorites.map((element, index) => {
        if (JSON.stringify(element._id) === JSON.stringify(id)) {
          flag.push(element);
          users[0].favorites.splice(index, 1);
        }
      });
      if (flag.length === 0) favorites.push(restaurant);
    } else favorites.push(restaurant);
    await userSchema.updateOne({ _id: users[0].id }, { $set: favorites });
    await users[0].save();
    res.status(200).json(users[0].favorites);
  } catch (error) {
    res.status(500).send(`{messaje: ${error}}`);
  }
};

/**
 * It's a function that receives a request and a response, and it tries to find a user by its id, and
 * if it finds it, it returns the user, and if it doesn't find it, it returns a message saying that the
 * user doesn't exist
 * @param req - The request object represents the HTTP request and has properties for the request query
 * string, parameters, body, HTTP headers, and so on.
 * @param res - the response object
 */
const routerGetByidUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userSchema.findById({ _id: id }).populate("review", {
      description: 1,
      rate: 1,
      restaurant: 1,
    });
    user
      ? res.status(200).json(user)
      : res.status(201).json({
          message: "the user you are trying to search for does not exist",
        });
  } catch (error) {
    res.status(500).json({ messaje: `${error}` });
  }
};

/**
 * It searches for a user by id, and if it finds it, it changes the baneado property of the user to the
 * opposite of what it was before
 * @param req - The request object represents the HTTP request and has properties for the request query
 * string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 */
const routerBanearOEnableUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userSchema.findById({ _id: id });
    let baneado = user.baneado;
    if (user) {
      if (baneado === false) baneado = true;
      else baneado = false;
    } else
      res.status(201).json({
        message: "the user you are trying to search for does not exist",
      });
    await userSchema.updateOne({ _id: id }, { $set: { baneado } });

    baneado
      ? res
          .status(200)
          .json({ message: "The user is temporarily or permanently disabled." })
      : res.status(200).json({ message: "the user is enabled" });
  } catch (error) {
    res.status(500).json({ messaje: `${error}` });
  }
};

module.exports = {
  routerGetUser,
  routerPostUser,
  routerPostSignin,
  routerGetFavorite,
  routerGetByidUser,
  routerBanearOEnableUser,
};
