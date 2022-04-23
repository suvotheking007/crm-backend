const UserController = require("../controllers/user.controller");
const { validateFindUser, validateToken, isAdmin } = require("../middlewares");

module.exports = (app) => {
  app.post("/user/find", [validateFindUser], UserController.findUser);
  app.get("/users", [validateToken, isAdmin], UserController.findAllUsers);
};
