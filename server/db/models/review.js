const Sequelize = require('sequelize')
const db = require('../db')


const Review = db.define('review', {
  //review write-up of particular beer
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  //rating from 1-10 of the beer
  rating : {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      max: 10,
      min: 1
    }
  }
})

module.exports = Review
