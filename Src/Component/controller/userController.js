const User = require('../models/userModel.js');
const Subscription = require('../models/subscriptionModel');
const UsageRecord = require('../models/usageRecordModel');
const Plan = require('../models/planModel');
const { sequelize } = require('../db/db.js');

exports.getCurrentUsage = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const subscription = await Subscription.findOne({ 
      where: { userId, isActive: true }, 
      include: [Plan] 
    });
    if (!subscription) return res.status(404).json({ message: 'Active subscription not found' });

    const totalUsedResult = await UsageRecord.findOne({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('usedUnits')), 'totalUsed']
      ],
      where: sequelize.where(sequelize.fn('MONTH', sequelize.col('createdAt')), sequelize.fn('MONTH', sequelize.fn('NOW'))),
      where: { userId }
    });
    const totalUsed = parseInt(totalUsedResult?.dataValues?.totalUsed || 0);
    const remaining = subscription.Plan.monthlyQuota - totalUsed;

    res.json({
      user,
      activePlan: subscription.Plan,
      totalUsed,
      remaining: remaining < 0 ? 0 : remaining
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBillingSummary = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const subscription = await Subscription.findOne({ 
      where: { userId, isActive: true }, 
      include: [Plan] 
    });
    if (!subscription) return res.status(404).json({ message: 'Active subscription not found' });

    const totalUsedResult = await UsageRecord.findOne({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('usedUnits')), 'totalUsed']
      ],
      where: sequelize.where(sequelize.fn('MONTH', sequelize.col('createdAt')), sequelize.fn('MONTH', sequelize.fn('NOW'))),
      where: { userId }
    });
    const totalUsed = parseInt(totalUsedResult?.dataValues?.totalUsed || 0);

    let extraUnits = 0;
    let extraCharges = 0;
    if (totalUsed > subscription.Plan.monthlyQuota) {
      extraUnits = totalUsed - subscription.Plan.monthlyQuota;
      extraCharges = parseFloat((extraUnits * subscription.Plan.extraChargePerUnit).toFixed(2));
    }

    res.json({
      user,
      activePlan: subscription.Plan,
      totalUsed,
      planQuota: subscription.Plan.monthlyQuota,
      extraUnits,
      extraCharges
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};