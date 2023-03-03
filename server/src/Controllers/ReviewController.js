const Reviews = require("../Models/Reviews");

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

module.exports = { routerGetReview };
