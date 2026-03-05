const express = require('express');
const router = express.Router();
const userController = require('../controller/userController.js');

router.get('/users/:id/current-usage', userController.getCurrentUsage);
router.get('/users/:id/billing-summary', userController.getBillingSummary);

module.exports = router;