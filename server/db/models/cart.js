const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  status:{
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'open',
    validate: {
      isIn: [['open', 'completed']]
    }
  },
  created_at:{
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  closed_at:{
    type: Sequelize.DATE,
  },
  total:{
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
})

module.exports = Cart

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */

