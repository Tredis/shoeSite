'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const Sequelize = require('sequelize');
const db = require('../index');
const User = require('./user');
const Comment = require('./comment');
const Order = require('./order');
const ShoeInventory = require('./shoeInventory');
const ShoeModel = require('./shoeModel');
const shoe_orders = db.define('shoe_orders', {
	quantity: Sequelize.INTEGER
})

ShoeModel.hasMany(ShoeInventory);
ShoeInventory.belongsTo(ShoeModel);

ShoeModel.hasMany(Comment);
Comment.belongsTo(ShoeModel);

Order.belongsToMany(ShoeInventory, { through: shoe_orders });
ShoeInventory.belongsToMany(Order, { through: shoe_orders });

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

module.exports = { User, Comment, Order, ShoeInventory, ShoeModel, shoe_orders }
