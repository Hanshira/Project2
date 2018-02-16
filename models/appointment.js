const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  hour: String,
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient"
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor"
  },
  address: {
    street: { type: String, required: true },
    zipCode: { type: Number, required: true },
    city: { type: String, required: true },
    floor: Number,
    lift: { type: String, enum: ["Yes", "No"], required: true }
  }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
