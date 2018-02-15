const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  patient: Schema.Types.ObjectId,
  doctor: Schema.Types.ObjectId,
  address: {
    street: { type: String },
    zipCode: { type: Number }
  }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
