const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  created_at:{
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  shippingStatus:{
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'processing',
    validate: {
      isIn: [['processing', 'shipped', 'delivered']]
    }
  },
  tracking_num:{
    type: Sequelize.STRING,
  },
  delivered:{
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  total:{
    type: Sequelize.INTEGER,
    allowNull: false,
  },
})

module.exports = Order

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */

