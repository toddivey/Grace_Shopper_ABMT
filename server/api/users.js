const router = require('express').Router()
const {User, Review, Order, Cart, Product} = require('../db/models')
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

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const data = await Cart.findOne({
      where: {status: 'open', userId: Number(req.params.userId)},
      include: [User, Product]
    })
    res.send(data)
  } catch (err) {
    next(err)
  }
})

//will need to do eager loading once assosciations are set
router.get('/:userId',isAdmin, async (req, res, next) => {
  try {
    const data = await User.findOne(
      {where: {id: Number(req.params.userId)},
      include: [Review, Order]
    }
    )
    res.send(data)
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

router.post('/',isAdmin, async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.status(201)
    .json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId',isAdmin, async (req, res, next) => {
  try {
    await User.update(
      { email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        profilePicture: req.body.profilePicture,
      },
      {where: {id: req.params.userId}}
    )
    res.send('User Updated!')
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId',isAdmin, async (req, res, next) => {
  try {
    await User.destroy({
      where: {id: req.params.userId}
    })
    res.send('User Deleted Successfully!')
  } catch (err) {
    next(err)
  }
})
