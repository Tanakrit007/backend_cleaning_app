// backend/controllers/user.controller.js
// ไฟล์: controllers/user.controller.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // 1. ตรวจสอบว่ามี secret หรือไม่ (ถ้าไม่มีจะพังและตอบ 500)
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is missing in environment variables");
    }

    const userDoc = await UserModel.findOne({ username });
    if (!userDoc) {
      return res.status(404).send({ message: "User not found" });
    }

    const isPasswordMatched = await bcrypt.compare(password, userDoc.password);
    if (!isPasswordMatched) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    // 2. สร้าง Token
    const token = jwt.sign(
      { id: userDoc._id, username: userDoc.username, role: userDoc.role },
      secret,
      { expiresIn: "1d" }
    );

    // 3. ส่งข้อมูลกลับ (ใช้ชื่อ userId และ token ให้ตรงกับ Frontend)
    return res.status(200).send({
      message: "Login successful",
      userId: userDoc._id,
      username: userDoc.username,
      role: userDoc.role,
      token: token, 
    });
  } catch (error) {
    console.error("🔥 LOGIN ERROR:", error.message); // ✅ ดูใน Terminal ของคุณเพื่อดูสาเหตุจริง
    return res.status(500).send({
      message: error.message || "Internal Server Error",
    });
  }
};

// ... ส่วน register คงเดิม ...

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send({ message: "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน" });

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) return res.status(400).send({ message: "ชื่อผู้ใช้นี้ถูกใช้งานแล้ว" });

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // บังคับ role: 'user' (Admin ต้องแก้ใน DB เอา)
    await UserModel.create({ username, password: hashedPassword, role: "user" });

    return res.status(201).send({ message: "สมัครสมาชิกสำเร็จ" });
  } catch (error) {
    return res.status(500).send({ message: error.message || "เกิดข้อผิดพลาดในการสมัครสมาชิก" });
  }
};