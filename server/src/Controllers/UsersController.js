const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../Models/Users");
const userSchema = require("../Models/Users");

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
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
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
    const users = await Users.find();
    // .populate("review", { description: 1, rate: 1, car: 1 })
    // .populate("reviewAccesories", {
    //   description: 1,
    //   rate: 1,
    //   accessories: 1,
    // })
    // .populate("billing", {
    //   invoice_number: 1,
    //   full_value: 1,
    //   discount: 1,
    //   car: 1,
    //   accessories: 1,
    // });
    if (dni) {
      let userDni = users.filter((user) => user.dni === Number(dni));
      userDni.length
        ? res.status(200).json(userDni)
        : res.status(201).json("Not found");
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json(`Error ${error}`);
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
    const { path, filename } = req.file;
    const image = `${path}%${filename}`;
    let passwordHash = await bcryptjs.hash(user.password, 12);
    const newUser = await new Users({
      dni: user.dni,
      name: user.name,
      eMail: user.eMail,
      image,
      password: passwordHash,
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
    res.status(500).send(`{messaje: ${error}}`);
  }
};

module.exports = { routerGetUser, routerPostUser, routerPostSignin };
