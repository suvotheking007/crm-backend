const Ticket = require("../models/ticket.model");
const User = require("../models/user.model");
const { httpCodes } = require("../utils/constants");

exports.createTicket = async (req, res) => {
  const userTicket = {
    status: req.body.status,
    createdBy: req.userId,
    assignedTo: req.body.assignTo,
    priority: req.body.priority,
    description: req.body.description,
    title: req.body.title,
  };

  try {
    const ticketCreated = await Ticket.create(userTicket);

    const user = await User.findOne({ userId: req.userId });

    user.ticketsCreated.push(ticketCreated._id);
    await user.save();

    return res
      .status(httpCodes.success)
      .send({
        message: "Ticket creation successful",
        ticket: ticketCreated,
        user: user,
      });
  } catch (err) {
    return res
      .status(httpCodes.internalServerError)
      .send({ message: "Unable to create the ticket", error: err.message });
  }

  // There is no automatic assignment of ticket to the engineer in this code however if there is any such automation logic, then it should here instead
};
