const {
  httpCodes,
  TicketStatusEnum,
  TicketPriorityEnum,
} = require("../../utils/constants");

exports.validateTicketRequest = (req, res, next) => {
  const requestBody = req.body;

  // Abort further processing if the description for the issue is not provided
  if (!requestBody.description) {
    return res.status(httpCodes.badRequest).send({
      message: "Unable to create the ticket",
      error: "Message describing the issue is required for creating the ticket",
    });
  }

  // Abort further processing if the title for the issue is not provided
  if (!requestBody.title) {
    return res.status(httpCodes.badRequest).send({
      message: "Unable to create the ticket",
      error: "Message describing the issue is required for creating the ticket",
    });
  }

  //   Abort further processing if the status is not valid
  if (requestBody.status && !TicketStatusEnum.includes(requestBody.status)) {
    return res.status(httpCodes.badRequest).send({
      message: "Unable to create the ticket",
      error: "Please use a valid ticket status",
    });
  }

  //   Abort further processing if the priority is not valid
  if (
    requestBody.priority &&
    !TicketPriorityEnum.includes(requestBody.priority)
  ) {
    return res.status(httpCodes.badRequest).send({
      message: "Unable to create the ticket",
      error: "Please use a valid ticket priority",
    });
  }

  next();
};
