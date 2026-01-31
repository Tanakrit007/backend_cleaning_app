const Service = require("../models/Service");

// ดึงข้อมูลบริการทั้งหมด
exports.getAll = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) { 
    res.status(500).json({ message: err.message }); 
  }
};

// ✅ เพิ่มฟังก์ชันดึงข้อมูลรายตัวตาม ID
exports.getById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "ไม่พบข้อมูลบริการ" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: "ID ไม่ถูกต้อง หรือเกิดข้อผิดพลาด" });
  }
};

exports.create = async (req, res) => {
  try {
    const newService = await Service.create(req.body);
    res.status(201).json(newService);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ... ฟังก์ชัน update และ delete คงเดิม ...

exports.update = async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedService);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.delete = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};