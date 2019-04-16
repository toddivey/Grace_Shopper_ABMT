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
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      isInt: true,
    }
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Out of Stock',
    validate: {
      notEmpty: true,
      isIn: [['Out of Stock', 'In Stock']]
    }
  },
  description: {
    type: Sequelize.TEXT,
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
    type: Sequelize.INTEGER,
    validate: {
      isInt: true,
      min: 0
    }
  },
  brewery: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
})

// Product.beforeValidate(product => {
//   if (product.inventory > 0) {
//     product.update({
//       status: 'In Stock'
//     })
//   }
// })

module.exports = Product