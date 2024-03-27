// models/Event.js
const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  date: Date,
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  }
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
