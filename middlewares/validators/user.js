const jwt = require("jsonwebtoken");

const { httpCodes, authSecretKey, userType } = require("../../utils/constants");
const User = require("../../models/user.model");

exports.validateFindUser = (req, res, next) => {
  if (!req.body.userId) {
    return res
      .status(httpCodes.badRequest)
      .send({ message: "User id is necessary to view the user data" });
  }

  next();
};

exports.validateToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res
      .status(httpCodes.forbidden)
      .send({ message: "Content cannot be accessed without a token" });
  }

  jwt.verify(token, authSecretKey, (err, verificationData) => {
    if (err) {
      return res
        .status(httpCodes.unAuthorized)
        .send({ message: "You are unauthorized to access the content" });
    }

    req.userId = verificationData.id;
    next();
  });
};

exports.isAdmin = async (req, res, next) => {
  const user = await User.findOne({ userId: req.userId });

  if (user.userType !== userType.admin) {
    return res
      .status(httpCodes.unAuthorized)
      .send({ message: "You are not permitted to access this" });
  }

  next();
};
