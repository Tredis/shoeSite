'use strict'

const Sequelize = require('sequelize')
const db = require('../index')

const Order = db.define('order', {
    datePlaced: {
      type: Sequelize.DATE,
      },
    tracking: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING,
    },
    payment: {
      type: Sequelize.STRING,
    },
    totalPrice: {
      type: Sequelize.INTEGER
    },
    status: { //Pending when in cart and placed
      type: Sequelize.ENUM('pending', 'shipped'),
      allowNull: false
    }

}, {});

module.exports = Order;
