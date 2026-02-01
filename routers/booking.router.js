const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking.controller");
const authJwt = require("../middlewares/authJWT.middleware");

// ✅ 1. สร้างการจอง (ใช้ Token ระบุตัวตน)
router.post("/", authJwt.verifyToken, bookingController.createBooking);

// ✅ 2. ดูประวัติของตัวเอง (เปลี่ยนจาก /:userId เป็น /my-bookings)
// วิธีนี้ปลอดภัยกว่า เพราะระบบจะดึง ID จาก Token โดยตรง ไม่ต้องส่ง ID มาทาง URL
router.get("/my-bookings", authJwt.verifyToken, bookingController.getUserBookings);

// ✅ 3. สำหรับ Admin ดูทั้งหมด
router.get("/", authJwt.verifyToken, bookingController.getAllBookings);

// เพิ่มบรรทัดนี้ในไฟล์ routers/booking.router.js
router.put("/:id/status", authJwt.verifyToken, bookingController.updateBookingStatus);

module.exports = router;