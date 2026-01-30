const express = require('express');
const router = express.Router();
const bookingController = require('../Controller/booking.controller');

router.post('/', bookingController.createBooking);
router.get('/:user', bookingController.getUserBookings);

// Admin / management endpoints
router.get('/', bookingController.getAllBookings);
router.put('/:id/status', bookingController.updateBookingStatus);

module.exports = router;