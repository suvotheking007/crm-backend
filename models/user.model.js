const { default: mongoose } = require("mongoose");
const Mongoose = require("mongoose");

const userSchema = Mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 10,
    unique: true,
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
  userType: {
    type: String,
    required: true,
    default: "CUSTOMER",
  },
  userStatus: {
    type: String,
    required: true,
    default: "APPROVED",
  },

  ticketsCreated: {
    type: [mongoose.SchemaType.ObjectId],
    ref: "Ticket",
  },

  ticketsAssigned: {
    type: [mongoose.SchemaType.ObjectId],
    ref: "Ticket",
  },
});

module.exports = Mongoose.model("User", userSchema);
