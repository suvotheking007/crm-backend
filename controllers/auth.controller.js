const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const constants = require("../utils/constants");
const UserType = constants.userType;
const UserStatus = constants.userStatus;

const { httpCodes, authSecretKey } = constants;

const User = require("../models/user.model");

// Registration controller
exports.register = async (req, res) => {
  // logic for setting the value of the userType to customer if the userType is not present
  let userType = req.body.userType;
  if (!userType) {
    userType = UserType.customer;
  }

  // logic for setting the value of the userStatus based on the userType
  let userStatus = UserStatus.pending;
  if (userType === UserType.customer) {
    userStatus = UserStatus.approved;
  }

  // creation of the user object that will be stored in the database
  const user = {
    name: req.body.name,
    userId: req.body.userId,
    password: bcrypt.hashSync(req.body.password, 8),
    email: req.body.email,
    userType: userType,
    userStatus: userStatus,
  };

  //  Storing the user in the database
  try {
    const createdUser = await User.create(user);

    console.log("user created", createdUser);

    const response = {
      name: createdUser.name,
      userId: createdUser.userId,
      email: createdUser.email,
      userType: createdUser.userType,
      userStatus: createdUser.userStatus,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    };

    res.status(httpCodes.success).send(response);
  } catch (err) {
    console.log(
      "Following error occured while storing the user in the database",
      err.message
    );
    res.status(httpCodes.internalServerError).send({ error: err.message });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    // Finding the user by the id provided
    const user = await User.findOne({ userId: req.body.userId });

    // Abort further processing if the user doesn't exist
    if (!user) {
      return res
        .status(httpCodes.badRequest)
        .send({ message: "User doesn't exist" });
    }

    // Check if the entered password is correct
    const passwordValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordValid) {
      return res
        .status(httpCodes.badRequest)
        .send({ message: "Password is not correct" });
    }

    // Generate token
    const token = jwt.sign({ id: user.userId }, authSecretKey);

    // Creation of the response object
    const response = {
      name: user.name,
      userId: user.userId,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      userType: user.userType,
      userStatus: user.userStatus,
      token,
    };

    return res.status(httpCodes.success).send(response);
  } catch (err) {
    return res
      .status(httpCodes.internalServerError)
      .send({ message: "Unable to find the user", error: err.message });
  }
};
