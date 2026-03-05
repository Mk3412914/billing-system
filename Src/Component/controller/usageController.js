const UsageRecord = require('../models/usageRecordModel');

exports.createUsage = async (req, res) => {
  try {
    const { userId, action, usedUnits } = req.body;
    if (!userId || !action || usedUnits == null) 
      return res.status(400).json({ message: 'Missing required fields' });

    const usage = await UsageRecord.create({ userId, action, usedUnits });
    res.status(201).json({ message: 'Usage recorded', usageId: usage.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};