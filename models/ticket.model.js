const Mongoose = require("mongoose");
const { ticketStatus, ticketPriority } = require("../utils/constants");

const ticketSchema = Mongoose.Schema({
  status: {
    type: String,
    required: true,
    default: ticketStatus.open,
  },

  createdBy: {
    type: String,
    required: true,
  },

  assignedTo: {
    type: String,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  priority: {
    type: Number,
    required: true,
    default: ticketPriority.one,
  },

  createdAt: {
    type: Date,
    immutable: true,
    default: () => {
      return Date.now();
    },
  },

  updatedAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
  },
});

module.exports = Mongoose.model("Ticket", ticketSchema);
