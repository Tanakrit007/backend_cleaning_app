const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // ทำให้ Server อ่าน JSON จาก Body ได้

// Connect to MongoDB
// ถ้าใช้ MongoDB Compass ให้คัดลอก Connection String มาวางในไฟล์ .env
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected with Compass'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const PORT = process.env.PORT || 5000;
// Register routers (so endpoints are available when starting server.js)
const userRouter = require('./routers/user.router');
const serviceRouter = require('./routers/service.router');
const bookingRouter = require('./routers/booking.router');

app.use('/api/users', userRouter);
app.use('/api/services', serviceRouter);
app.use('/api/bookings', bookingRouter);

// Simple test route
app.get('/test', (req, res) => res.send('API is working!'));

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});