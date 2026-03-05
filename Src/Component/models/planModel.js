const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.js'); 

const Plan = sequelize.define('Plan', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  monthlyQuota: { type: DataTypes.INTEGER, allowNull: false },
  extraChargePerUnit: { type: DataTypes.DECIMAL(10,2), allowNull: false }
}, { tableName: 'plans', timestamps: false });

module.exports = Plan;