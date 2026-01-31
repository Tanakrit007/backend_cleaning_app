const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service.controller");

router.get("/", serviceController.getAll); // สำหรับหน้าแรก
router.get("/:id", serviceController.getById); // ✅ เพิ่มบรรทัดนี้สำหรับหน้า Detail
router.post("/", serviceController.create);
router.put("/:id", serviceController.update);
router.delete("/:id", serviceController.delete);

module.exports = router;