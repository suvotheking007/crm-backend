const TicketController = require("../controllers/ticket.controller");

const { validateTicketRequest, validateToken } = require("../middlewares");

module.exports = (app) => {
  app.post(
    "/ticket/create",
    [validateToken, validateTicketRequest],
    TicketController.createTicket
  );
};
