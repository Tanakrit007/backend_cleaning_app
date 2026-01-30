const express = require('express');
const router = express.Router();
const serviceController = require('../controller/service.controller');

router.get('/', serviceController.getServices);
router.post('/', serviceController.createService);
// router.put('/:id', ...);
router.put('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

module.exports = router;