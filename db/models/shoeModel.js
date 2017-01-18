'use strict'

const Sequelize = require('sequelize')
const db = require('../index')

const ShoeModel = db.define('shoe_model', {
    brand: {
      type: Sequelize.STRING,
      allowNull: false
      },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    style: {
      type: Sequelize.STRING,
      allowNull: false
    },
    image_url: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    description: {
      type: Sequelize.TEXT
    },
    country_of_origin: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    rating: {
      type: Sequelize.FLOAT,
      validate: {
        min: 1,
        max: 5,
      },
    },
    gender: {
      type: Sequelize.ENUM('Women', 'Men')
    }

}, {});

module.exports = ShoeModel;