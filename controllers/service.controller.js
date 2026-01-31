const Service = require("../models/Service");

exports.getAll = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const newService = await Service.create(req.body);
    res.status(201).json(newService);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

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