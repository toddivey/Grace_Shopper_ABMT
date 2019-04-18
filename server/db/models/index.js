const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Cart = require('./cart')
const Review = require('./review')
const Categories = require('./categories')
const CartProducts = require('./cart_products')
const OrderProducts = require('./order_products')

/*
  1) update relationships below (for example, Cart and Products have a many to many relationship, so that needs to be updated below)

  2) include your many to many relationships below too
  example:
  Cart.belongsToMany(Product, {through: CartProducts})
  Product.belongsToMany(Cart, {through: CartProducts})

  The CartProducts refers to what you are exporting from the cart_products.js file. You can customize the CartProducts table in the cart_products.js file that you have, where you are defining that model

  3) consider consolidating your cart and order logic

  4) regarding how to handle price fluctuations, here is a suggestion:
  - in CartProducts table, add a price column
  - price column can be null when user adds adds product to their cart
    - however, you still will need to display the price of product in cart (and perhaps elsewhere), so to do that, create an instance method in your CartProducts model which gets the price from the Products table
  - as soon as user checks out their cart, update the price in CartProducts to reflect the price they purchased product at, which can be displayed later to show order history
*/

Review.belongsTo(Product)
Review.belongsTo(User)
Cart.belongsTo(User)
Order.belongsTo(User)
Cart.hasMany(Product)
Order.hasMany(Product)
Product.belongsTo(Categories)
User.hasMany(Order)
User.hasMany(Cart)
User.hasMany(Review)
Product.hasMany(Review)
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Order,
  Cart,
  Review,
  Categories,
  CartProducts,
  OrderProducts
}
