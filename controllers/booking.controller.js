const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {
    // ดึง userId จาก Token ที่ login อยู่ (authJWT middleware จะใส่ req.userId มาให้)
    const userId = req.userId; 
    
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const booking = await Booking.create({
      ...req.body,
      userId: userId // บันทึกว่าใครเป็นคนจอง
    });
    
    // Populate ข้อมูล Service กลับไปให้ Frontend แสดงผลสวยๆ
    const populatedBooking = await Booking.findById(booking._id).populate('service');
    
    res.status(201).json(populatedBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    // ✅ แก้ไข: ดึง userId จาก req.userId ที่ได้จาก middleware verifyToken
    const userId = req.userId; 

    if (!userId) {
      return res.status(401).json({ message: "ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบใหม่" });
    }

    // ค้นหาการจองที่ตรงกับ User และดึงข้อมูล Service มาแสดงผล (Populate)
    const bookings = await Booking.find({ userId })
      .populate('service') 
      .sort({ createdAt: -1 }); // เรียงจากล่าสุดขึ้นก่อน

    res.json(bookings);
  } catch (err) {
    console.error("Error in getUserBookings:", err);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการดึงข้อมูล: " + err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    // สำหรับ Admin ดึงทั้งหมด
    const bookings = await Booking.find().populate('service').populate('userId', 'username').sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};