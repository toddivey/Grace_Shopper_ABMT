const router = require('express').Router()
const { Product, User, Review } = require('../db/models')
module.exports = router


router.get('/:reviewId', async (req, res, next) => {
  try {
    const data = await Review.findOne(
      {
        where: { id: Number(req.params.reviewId) },
        include: [Product, User]
      })
    res.send(data)
  } catch (err) {
    next(err)
  }
})


router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: [Product, User]
    })
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const review = await Review.create(req.body)
    res.status(201)
      .json(review)
  } catch (err) {
    next(err)
  }
})

router.put('/:reviewId', async (req, res, next) => {
  try {
    await Review.update(
      {
        content: req.body.content,
        rating: req.body.rating
      },
      { where: { id: Number(req.params.reviewId) } }
    )
    res.send('Review Updated!')
  } catch (err) {
    next(err)
  }
})

router.delete('/:reviewId', async (req, res, next) => {
  try {
    await Product.destroy({
      where: { id: Number(req.params.reviewId) }
    })
    res.send('Review Deleted Successfully!')
  } catch (err) {
    next(err)
  }
})
