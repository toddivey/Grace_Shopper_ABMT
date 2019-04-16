const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
      isDecimal: true,
    }
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'In Stock',
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
  },
  rating: {
    type: Sequelize.DECIMAL(10,1),
    validate: {
      isDecimal: true,
      min: 0,
      max: 5
    }
  }
})

module.exports = Product