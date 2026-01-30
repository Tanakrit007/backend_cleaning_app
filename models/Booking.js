const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    service: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Service', // อ้างอิงไปยัง Services Collection
        required: true 
    },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    appointmentDate: { type: Date, required: true },
    status: { 
        type: String, 
        enum: ['pending', 'confirmed', 'completed', 'cancelled'], 
        default: 'pending' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);