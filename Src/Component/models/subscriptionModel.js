const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.js'); 
const User = require('./userModel.js');
const Plan = require('./planModel.js');

const Subscription = sequelize.define('Subscription', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
  planId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'plans', key: 'id' } },
  startDate: { type: DataTypes.DATEONLY, allowNull: false },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { tableName: 'subscriptions', timestamps: false });

// Associations
Subscription.belongsTo(User, { foreignKey: 'userId' });
Subscription.belongsTo(Plan, { foreignKey: 'planId' });

module.exports = Subscription;