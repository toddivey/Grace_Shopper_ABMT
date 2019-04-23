const router = require('express').Router()
const {
  User,
  Review,
  Order,
  Cart,
  Product,
  CartProducts
} = require('../db/models')
const isAdmin = require('../middleware/admin')
module.exports = router

router.get('/:userId/cart/:cartId', async (req, res, next) => {
  try {
    const data = await Cart.findOne({
      where: {id: Number(req.params.cartId), userId: Number(req.params.userId)},
      include: [User, Product]
    })
    res.send(data)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/cart/:cartId', async (req, res, next) => {
  try {
    await CartProducts.update(
      {
        quantity: Number(req.body[1]),
        price: req.body[2]
      },
      {where: {productId: req.body[0], cartId: req.params.cartId}}
    )
    res.send('Quantity Updated!')
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId/cart/:cartId', async (req, res, next) => {
  try {
    await CartProducts.destroy({
      where: {productId: req.body.productId, cartId: req.params.cartId}
    })
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const data = await Cart.findOrCreate({
      where: {status: 'open', userId: Number(req.params.userId)},
      include: [User, Product]
    })
    res.send(data)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId/cart', async (req, res, next) => {
  try {
    const data = await CartProducts.findOrCreate({
      where: {
        productId: req.body[0].productId,
        cartId: req.body[0].cartId
      }
    })
    res.redirect('./cart')
    // res.send('Cart Updated!')
  } catch (err) {
    console.log('I AM ERR', err)
    next(err)
  }
})

//will need to do eager loading once assosciations are set
router.get('/:userId', isAdmin, async (req, res, next) => {
  try {
    const data = await User.findOne({
      where: {id: Number(req.params.userId)},
      include: [Review, Order]
    })
    res.send(data)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', isAdmin, async (req, res, next) => {
  try {
    await User.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        admin: req.body.admin,
        email: req.body.email,
        address: req.body.address,
        profilePicture: req.body.profilePicture,
      },
      {where: {id: Number(req.params.userId)}}
    )
    res.send('User Updated!')
  } catch (err) {
    next(err)
  }
})


router.get('/', isAdmin, async (req, res, next) => {
  try {
    //will need to do eager loading once assosciations are set
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', isAdmin, async (req, res, next) => {
  try {
    console.log("PUT ROUTE REQ BODY", req.body)
    await User.update(
      {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        profilePicture: req.body.profilePicture
      },
      {where: {id: Number(req.params.userId)}}
    )
    res.send('User Updated!')
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', isAdmin, async (req, res, next) => {
  try {
    await User.destroy({
      where: {id: req.params.userId}
    })
    res.send('User Deleted Successfully!')
  } catch (err) {
    next(err)
  }
})
