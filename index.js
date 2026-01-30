 const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/user.router'); // เช็ค path ไฟล์ให้ถูก

const app = express();

app.use(cors());
app.use(express.json()); // สำคัญมาก!

// Register route
app.use('/api/users', userRouter);

// ลองเพิ่ม route ทดสอบตรงนี้
app.get('/test', (req, res) => res.send("API is working!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));