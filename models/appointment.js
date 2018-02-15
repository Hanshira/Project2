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
    street: { type: String, required: true },
    zipCode: { type: Number, required: true },
    floor: Number,
    lift: { type: String, enum: ["Yes", "No"], required: true }
  }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
