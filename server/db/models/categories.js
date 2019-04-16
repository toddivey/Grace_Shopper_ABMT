const Sequelize = require('sequelize')
const db = require('../db')

const Categories = db.define('categories', {
  //names of styles of beer
  style: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  //brief description of that style
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }

})

module.exports = Categories
