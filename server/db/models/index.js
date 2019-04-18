const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Cart = require('./cart')
const Review = require('./review')
const Categories = require('./categories')
const CartProducts = require('./cart_products')
const ProductCategories = require('./product_categories')

//User Associations
User.hasMany(Order)
User.hasMany(Cart)
User.hasMany(Review)

//Product Associations
Product.belongsToMany(Categories, {through: ProductCategories})
Product.hasMany(Review)
Product.belongsToMany(Order, { through: CartProducts })
Product.belongsToMany(Cart, { through: CartProducts })

//Order Associations
Order.belongsTo(User)
Order.belongsToMany(Product, {through: CartProducts})

//Cart Associations
Cart.belongsToMany(Product, {through: CartProducts})
Cart.belongsTo(User)

//Review Associations
Review.belongsTo(Product)
Review.belongsTo(User)

//Category Associations
Categories.belongsToMany(Product, { through: ProductCategories })

module.exports = {
  User,
  Product,
  Order,
  Cart,
  Review,
  Categories,
  CartProducts,
  ProductCategories
}
