const bcrypt = require("bcrypt");

exports.httpCodes = {
  success: 200,
  internalServerError: 500,
  badRequest: 400,
  forbidden: 403,
  unAuthorized: 401,
};

exports.userType = {
  customer: "CUSTOMER",
  admin: "ADMIN",
  engineer: "ENGINEER",
};

exports.userStatus = {
  pending: "PENDING",
  approved: "APPROVED",
  rejected: "REJECTED",
};

exports.ticketStatus = {
  open: "OPEN",
  closed: "CLOSED",
};

exports.TicketStatusEnum = Object.entries(this.ticketStatus).map(
  (result) => result[1]
);

exports.ticketPriority = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
};

exports.TicketPriorityEnum = Object.entries(this.ticketPriority).map(
  (result) => result[1]
);

exports.authSecretKey = "dfvkjdfhviufh34(*&&&2wdhudh";

exports.topAdmin = {
  name: "Subhajit bera",
  userId: "admin",
  email: "theOnlyKing007@gmail.com",
  userType: "ADMIN",
  password: bcrypt.hashSync("kingAdmin", 10),
};
