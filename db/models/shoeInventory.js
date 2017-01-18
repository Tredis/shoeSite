
'use strict'

const Sequelize = require('sequelize')
const db = require('../index')

const ShoeInventory = db.define('shoe_inventory', {
    size: {
      type: Sequelize.FLOAT,
      allowNull: false,
      validate: {
        min: 4,
        max: 20
      }
      },
    color: {
      type: Sequelize.STRING,
      allowNull: false
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    }
  }, {});

module.exports = ShoeInventory;