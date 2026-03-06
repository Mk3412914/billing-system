const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.js'); 
const User = require('../models/userModel.js');

const UsageRecord = sequelize.define('UsageRecord', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
  action: { type: DataTypes.STRING, allowNull: false },
  usedUnits: { type: DataTypes.INTEGER, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'usagerecords', timestamps: false });

UsageRecord.belongsTo(User, { foreignKey: 'userId' });

module.exports = UsageRecord;