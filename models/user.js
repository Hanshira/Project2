const mongoose = require("mongoose");
const Appointment = require("./appointment");

const Doctor = require("./doctor");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  familyName: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  zipCode: Number,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  appointmentsBooked: [
    {
      type: Schema.Types.ObjectId,
      ref: "Appointment"
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
