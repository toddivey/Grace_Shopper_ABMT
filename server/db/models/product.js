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
    defaultValue: 'Out of Stock',
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
  },
  rating: {
    type: Sequelize.DECIMAL(10, 2),
    validate: {
      isDecimal: true,
      min: 0.0,
      max: 5.0
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'default-beer.jpg'
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  ABV: {
    type: Sequelize.DECIMAL(10, 2),
    validate: {
      isDecimal: true,
      min: 0.0
    }
  },
  brewery: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  }
})

Product.beforeUpdate = function () {
  if (this.inventory > 0) {
    return this.update({
      status: 'In Stock'
    })
  }
}

module.exports = Product