const router = require('express').Router()
const {User, Order, CartProducts, Product} = require('../db/models')
const isAdmin = require('../middleware/admin')
module.exports = router

router.get('/:orderId', isAdmin, async (req, res, next) => {
  try {
    const data = await Order.findOne({
      where: {id: Number(req.params.orderId)},
      include: [User]
    })
    res.send(data)
  } catch (err) {
    next(err)
  }
})

router.get('/user/:userId', isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {userId: Number(req.params.userId)},
      include: [User]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const review = await Order.create(req.body)
    res.status(201).json(review)
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId', isAdmin, async (req, res, next) => {
  try {
    await Order.update(
      {
        shipping_status: req.body.shipping_status,
        tracking_num: req.body.tracking_num,
        total: req.body.total
      },
      {where: {id: Number(req.params.orderId)}}
    )
    res.send('Order Updated!')
  } catch (err) {
    next(err)
  }
})

router.delete('/:orderId', isAdmin, async (req, res, next) => {
  try {
    await Order.destroy({
      where: {id: Number(req.params.reviewId)}
    })
    res.send('Order Deleted Successfully!')
  } catch (err) {
    next(err)
  }
})
