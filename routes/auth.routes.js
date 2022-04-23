const auth = require("../controllers/auth.controller");

const { validateRegister, validateLogin } = require("../middlewares");

module.exports = (app) => {
  app.post("/register", [validateRegister], auth.register);
  app.post("/login", [validateLogin], auth.login);
};
