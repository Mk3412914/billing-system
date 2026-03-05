const express = require('express');
const router = express.Router();
const usageController = require('../controller/usageController.js');

router.post('/usage', usageController.createUsage);

module.exports = router;     