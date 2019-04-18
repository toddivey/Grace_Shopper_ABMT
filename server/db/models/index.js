const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Cart = require('./cart')
const Review = require('./review')
const Categories = require('./categories')
const CartProducts = require('./cart_products')

//User Associations
User.hasMany(Order)
User.hasMany(Cart)
User.hasMany(Review)

//Product Associations
Product.hasMany(Categories, {through: 'ProductCategories'})
Product.hasMany(Review)
Product.belongsToMany(Order, { through: CartProducts })
Product.belongsToMany(Cart, { through: CartProducts })

//Order Associations
Order.belongsTo(User)
Order.hasMany(Product, {through: CartProducts})

//Review Associations
Review.belongsTo(Product)
Review.belongsTo(User)

//Cart Associations
Cart.hasMany(Product, {through: CartProducts})
Cart.belongsTo(User)

//Category Associations
Categories.hasMany(Product, { through: 'ProductCategories' })

module.exports = {
  User,
  Product,
  Order,
  Cart,
  Review,
  Categories,
  CartProducts
}
