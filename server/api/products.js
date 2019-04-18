const router = require('express').Router()
const {Product, Categories, Review} = require('../db/models')
module.exports = router


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
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    res.status(201)
    .json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', async (req, res, next) => {
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

router.delete('/:productId', async (req, res, next) => {
  try {
    await Product.destroy({
      where: {id: req.params.productId}
    })
    res.send('Product Deleted Successfully!')
  } catch (err) {
    next(err)
  }
})
