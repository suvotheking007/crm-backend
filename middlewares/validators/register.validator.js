const { httpCodes } = require("../../utils/constants");
const UserModel = require("../../models/user.model");

module.exports = async (req, res, next) => {
  // Check if the "name" is present
  if (!req.body.name) {
    return res
      .status(httpCodes.badRequest)
      .send({ message: `Unable to register as "name" is missing` });
  }

  //   Check if the "userId" is present
  if (!req.body.userId) {
    return res
      .status(httpCodes.badRequest)
      .send({ message: `Unable to register as "userId" is missing` });
  }

  //   Check if the "password" is present
  if (!req.body.password) {
    return res
      .status(httpCodes.badRequest)
      .send({ message: `Unable to register as "password" is missing` });
  }

  //   Check if the "email" is present
  if (!req.body.email) {
    return res
      .status(httpCodes.badRequest)
      .send({ message: `Unable to register as "email" is missing` });
  }

  //   Check if the user is already present
  const user = await UserModel.findOne({ userId: req.body.userId });
  if (user !== null) {
    return res
      .status(httpCodes.badRequest)
      .send({ message: `Unable to register as the user already exist` });
  }

  next();
};
