const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (err) {
        res.status(400).json({ message: "Booking failed", error: err.message });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const { user } = req.params;
        const bookings = await Booking.find({ customerName: user }).populate('service');
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('service');
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!['pending','confirmed','completed','cancelled'].includes(status)) return res.status(400).json({ message: 'Invalid status' });
        const updated = await Booking.findByIdAndUpdate(id, { status }, { new: true });
        if (!updated) return res.status(404).json({ message: 'Booking not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};