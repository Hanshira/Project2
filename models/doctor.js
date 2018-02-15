const mongoose = require("mongoose");
const User = require("./user");
const Schema = mongoose.Schema;
const TYPES = require("../config/speciality-types");

const doctorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  familyName: {
    type: String,
    required: true
  },
  imageUrl: String,
  speciality: {
    type: String,
    required: true,
    enum: TYPES
  },
  prices: {
    price: Number,
    paymentMethod: { type: String, enum: ["Cash", "Credit card", "Check"] }
  },
  workingHours: [
    {
      day: {
        type: String,
        enum: ["Mon", "Thu", "Wed", "Thur", "Fri", "Sat"],
        required: true
      },
      hours: { type: String, required: true }
    }
  ],
  address: [
    {
      street: { type: String, required: true },
      zipCode: { type: Number, required: true },
      floor: Number,
      lift: { type: String, enum: ["Yes", "No"], required: true }
    }
  ],
  city: { type: String, required: true },
  telephone: {
    type: String,
    required: true
  },
  presentation: String,
  languages: String,
  website: String,
  comments: [
    {
      body: String,
      rate: { type: Number, min: 0, max: 5 },
      date: Date,
      author: Schema.Types.ObjectId
    }
  ],
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Doctor", doctorSchema);
