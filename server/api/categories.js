const router = require('express').Router()
const {Product, Categories, Review} = require('../db/models')
const isAdmin = require('../middleware/admin')
module.exports = router


//will need to do eager loading once assosciations are set
router.get('/:categoriesId', async (req, res, next) => {
  try {
    const data = await Categories.findOne(
      {where: {id: Number(req.params.categoriesId)},
      include: [Product]
    })
    res.send(data)
  } catch (err) {
    next(err)
  }
})


router.get('/', async (req, res, next) => {
  try {
    //will need to do eager loading once assosciations are set
    const categories = await Categories.findAll(
    )
    res.json(categories)
  } catch (err) {
    next(err)
  }
})
