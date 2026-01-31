// ไฟล์: index.js
require("dotenv").config(); // ✅ ต้องอยู่บรรทัดแรกสุดเท่านั้น
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserRouter = require("./routers/user.router");
const ServiceRouter = require("./routers/service.router");
const BookingRouter = require("./routers/booking.router");

const app = express();
const PORT = process.env.PORT || 5000;
// ✅ แก้ให้ตรงกับ .env ของคุณ (MONGODB_URI)
const DB_URL = process.env.MONGODB_URI; 

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Routes
app.use("/api/users", UserRouter);
app.use("/api/services", ServiceRouter);
app.use("/api/bookings", BookingRouter);

// Database Connection
if (!DB_URL) {
    console.error("❌ Error: MONGODB_URI is not defined in .env file");
} else {
    mongoose.connect(DB_URL)
        .then(() => console.log("✅ MongoDB Connected"))
        .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));
}

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));