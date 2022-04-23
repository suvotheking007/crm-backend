const { httpCodes } = require("../../utils/constants");

module.exports = (req, res, next) => {
  // Check if "userId" is present
  if (!req.body.userId) {
    return res
      .status(httpCodes.badRequest)
      .send({ message: "User id is required for login" });
  }

  // Check if "password" is present
  if (!req.body.password) {
    return res
      .status(httpCodes.badRequest)
      .send({ message: "Password is required for login" });
  }

  next();
};
