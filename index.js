const Express = require("express");
const Mongoose = require("mongoose");
const ServerConfig = require("./configs/server.config");
const DbConfig = require("./configs/db.config");
const BodyParser = require("body-parser");
const { initializeTopAdmin } = require("./extras/initializers");

const app = Express();
const port = ServerConfig.PORT;

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

Mongoose.connect(DbConfig.DB_URL, () => {
  console.log("connected to MongoDB");
  initializeTopAdmin();
});

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/ticket.routes")(app);

app.listen(port, () => {
  console.log("Application has started on the port", port);
});
