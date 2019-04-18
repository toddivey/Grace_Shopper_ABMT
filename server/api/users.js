const router = require('express').Router()
const {User, Review, Order} = require('../db/models')
const isAdmin = require('../middleware/admin')
module.exports = router

//will need to do eager loading once assosciations are set
router.get('/:userId', async (req, res, next) => {
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


router.get('/', async (req, res, next) => {
  try {
    //will need to do eager loading once assosciations are set
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.status(201)
    .json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
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

router.delete('/:userId', async (req, res, next) => {
  try {
    await User.destroy({
      where: {id: req.params.userId}
    })
    res.send('User Deleted Successfully!')
  } catch (err) {
    next(err)
  }
})
