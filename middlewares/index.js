const validateRegister = require("./validators/register.validator");
const validateLogin = require("./validators/login.validator");
const {
  validateFindUser,
  validateToken,
  isAdmin,
} = require("./validators/user");
const { validateTicketRequest } = require("./validators/ticket");

module.exports = {
  validateRegister,
  validateLogin,
  validateFindUser,
  validateToken,
  validateTicketRequest,
  isAdmin,
};
