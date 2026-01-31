const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true // บังคับว่าต้องมี user ที่จอง
  },
  service: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Service",
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model("Booking", BookingSchema);