const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking.controller");
const authJwt = require("../middlewares/authJWT.middleware");

// ต้อง Login ก่อนถึงจะจองหรือดูประวัติได้
router.post("/", authJwt.verifyToken, bookingController.createBooking);
router.get("/", authJwt.verifyToken, bookingController.getAllBookings); // สำหรับ Admin
router.get("/:userId", authJwt.verifyToken, bookingController.getUserBookings); // สำหรับ User ดูประวัติตัวเอง

module.exports = router;