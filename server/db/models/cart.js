const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  status:{

  },
  created_at:{

  },
  closed_at:{

  },
  total:{

  },
  shipping_cost:{

  },
  tax:{

  },
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

