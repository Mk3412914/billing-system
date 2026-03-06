const express = require('express');
const router = express.Router();
const usageController = require('../controller/usageController.js');


router.post('/', usageController.createUsage);


router.get('/current/:id', usageController.getCurrentUsage);

router.get('/billing/:id', usageController.getBillingSummary);

module.exports = router;

module.exports = router;     