const Scan = require("../models/Scan");

exports.recordScan = async (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"];
    const { location, timeSpent } = req.body;

    const newScan = new Scan({ ip, userAgent, location, timeSpent });
    await newScan.save();

    res.status(201).json({ message: "Scan recorded successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTotalScans = async (req, res) => {
  try {
    const total = await Scan.countDocuments();
    res.json({ total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUniqueUsers = async (req, res) => {
  try {
    const uniqueUsers = await Scan.distinct("ip");
    res.json({ count: uniqueUsers.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCampaignStats = async (req, res) => {
  try {
    const total = await Scan.countDocuments();
    const avgTimeSpent = 12; // dummy
    const ctaClicks = 35; // dummy

    res.json({
      campaign: "Print-to-Life AR Campaign",
      totalScans: total,
      avgTimeSpent,
      ctaClicks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
