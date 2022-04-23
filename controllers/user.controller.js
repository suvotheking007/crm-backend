const { httpCodes } = require("../utils/constants");
const {
  removeObjectField,
} = require("../utils/manipulators/array/arrayOfObjects");
const User = require("../models/user.model");

exports.findUser = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.body.userId });

    const response = {
      name: user.name,
      userId: user.userId,
      email: user.email,
      userType: user.userType,
      userStatus: user.userStatus,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return res.status(httpCodes.success).send(response);
  } catch (err) {
    res
      .status(httpCodes.internalServerError)
      .send({ message: "Unable to fetch the user", error: err.message });
  }
};

exports.findAllUsers = async (req, res) => {
  try {
    let users = await User.find();

    users = removeObjectField(users, (el) => {
      return {
        name: el.name,
        userId: el.userId,
        email: el.email,
        userType: el.userType,
        userStatus: el.userStatus,
      };
    });

    return res.status(httpCodes.success).send(users);
  } catch (err) {
    return res
      .status(httpCodes.internalServerError)
      .send({ message: "Error in fetching all the users", error: err.message });
  }
};
