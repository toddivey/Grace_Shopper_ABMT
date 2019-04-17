const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Cart = require('./cart')
const Review = require('./review')
const Categories = require('./categories')
const CartProducts = require('./cart_products')
const OrderProducts = require('./order_products')

Review.belongsTo(Product);
Review.belongsTo(User);
Cart.belongsTo(User);
Order.belongsTo(User);
Cart.hasMany(Product);
Order.hasMany(Product);
Product.belongsTo(Categories);
User.hasMany(Order);
User.hasMany(Cart);
User.hasMany(Review);
Product.hasMany(Review);
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
