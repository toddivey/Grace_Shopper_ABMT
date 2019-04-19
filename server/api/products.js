const router = require('express').Router()
const {Product, Categories, Review} = require('../db/models')
const isAdmin = require('../middleware/admin')
module.exports = router

router.get('/page/:pageId', async (req, res, next) => {
  try {
    //will need to do eager loading once assosciations are set
    const offset = (Number(req.params.pageId) - 1) * 8
    const limit = offset + 8

    const products = await Product.findAll({
      limit,
      offset,
      order: [['id', 'ASC']]
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

//will need to do eager loading once assosciations are set
router.get('/:productId', async (req, res, next) => {
  try {
    const data = await Product.findOne(
      {where: {id: Number(req.params.productId)},
      include: [Review, Categories]
    })
    res.send(data)
  } catch (err) {
    next(err)
  }
})



router.get('/', async (req, res, next) => {
  try {
    //will need to do eager loading once assosciations are set
    const offset = 0
    const limit = offset + 8

    const products = await Product.findAll({limit,
      order: [['id', 'ASC']]
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})



router.post('/', isAdmin, async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.status(201)
    .json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId',isAdmin, async (req, res, next) => {
  try {
    await Product.update(
      { name: req.body.name,
        price: req.body.price,
        status: req.body.status,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        inventory: req.body.inventory,
        ABV: req.body.ABV,
        brewery: req.body.brewery
      },
      {where: {id: req.params.productId}}
    )
    res.send('Product Updated!')
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', isAdmin, async (req, res, next) => {
  try {
    await Product.destroy({
      where: {id: req.params.productId}
    })
    res.send('Product Deleted Successfully!')
  } catch (err) {
    next(err)
  }
})
