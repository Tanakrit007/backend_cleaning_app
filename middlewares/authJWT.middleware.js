const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
    // รองรับทั้ง x-access-token และ Authorization header
    const token = req.headers["x-access-token"] || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
         return res.status(401).send({ message: "Token is missing!" });
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(403).send({ message: "Access Forbidden" });
      }

      // ✅ แก้ตรงนี้: เปลี่ยนจาก req.authorId เป็น req.userId
      req.userId = decoded.id; 
      req.username = decoded.username;
      req.role = decoded.role;
      next();
    });
};

const authJwt = { verifyToken };
module.exports = authJwt;