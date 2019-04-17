const Sequelize = require('sequelize')
const db = require('../db')

const OrderProducts = db.define('orderProducts', {
  quantity:{
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      isInt: true,
      min: 0
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 0
    }
  }
})

module.exports = OrderProducts