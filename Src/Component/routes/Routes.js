const express = require("express");
const router = express.Router();


const {
  recordUsage,
  getCurrentUsage,
  getBillingSummary
} = require("../controller/usageController.js");  

router.post("/usage", recordUsage);
router.get("/users/:id/current-usage", getCurrentUsage);
router.get("/users/:id/billing-summary", getBillingSummary);

module.exports = router;