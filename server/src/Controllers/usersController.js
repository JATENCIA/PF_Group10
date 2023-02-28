const bcryptjs = require("bcryptjs");

const routerGetUser = async (req, res) => {
  const user = {
    dni: 111111,
    name: "Aslan",
    lastName: "Narnia",
    telephone: "5555555",
    eMail: "aslan@gmail.com",
    password: "123456",
  };
  try {
    let passwordHash = await bcryptjs.hash(user.password, 12);
    const getUser = {
      dni: user.dni,
      name: user.name,
      lastName: user.lastName,
      telephone: user.telephone,
      eMail: user.eMail,
      password: passwordHash,
    };

    res.status(200).json(getUser);
  } catch (error) {
    res.status(500).send(`{messaje: ${error}}`);
  }
};

module.exports = { routerGetUser };
