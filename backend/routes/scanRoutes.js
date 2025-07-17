const express = require("express");
const router = express.Router();
const {
  recordScan,
  getTotalScans,
  getUniqueUsers,
  getCampaignStats,
} = require("../controllers/scanController");

router.post("/", recordScan);
router.get("/total", getTotalScans);
router.get("/unique", getUniqueUsers);
router.get("/campaign", getCampaignStats);

module.exports = router;
