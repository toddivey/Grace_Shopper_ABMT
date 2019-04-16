'use strict'

const db = require('../server/db')
const { User, Product } = require('../server/db/models')


async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
const products = await Promise.all([
  Product.create({
    name: 'Freedom of Speach', price: 10.00, status: 'In Stock', description: 'Freedom of Speach is naturally soured in the brew kettle and fermented out dry with a lower alcohol level. Our easy-drinking session sour demonstrates a clean tartness, balanced out by an assembly of ripe peach flavor. Exercise your right to refreshment.', rating: 4.5, imageUrl: 'https://revbrew.com/imager/d37xww59oglu30_cloudfront_net/beer/FreedomofSpeach-Website_7a380b392d6d6308eb7e6af7dcd28cdd.png', inventory: 50, ABV: 4.5, brewery: 'Revolution'
  }),
  Product.create({
    name: 'Freedom of Press', price: 10.00, status: 'In Stock', description: 'Keep currant with the latest entry in our session sour series-—sweet, earthy berry flavors from black currants to complement this 140 calorie, easy-drinking, lightly tart ale.', rating: 4.5, imageUrl: 'https://revbrew.com/imager/d37xww59oglu30_cloudfront_net/beer/FinalFreedomofSpeach-Website_7a380b392d6d6308eb7e6af7dcd28cdd.png', inventory: 50, ABV: 4.5, brewery: 'Revolution'
  }),
  Product.create({
    name: 'Rosa', price: 10.00, status: 'In Stock', description: 'A highly drinkable Golden Ale steeped with hibiscus, resulting in a natural tartness and slight pink hue.', rating: 4.8, imageUrl: 'https://revbrew.com/imager/d37xww59oglu30_cloudfront_net/beer/Rosa-WebCan_7a380b392d6d6308eb7e6af7dcd28cdd.png', inventory: 100, ABV: 5.8, brewery: 'Revolution'
  }),
  Product.create({
    name: 'Sun Crusher', price: 10.00, status: 'In Stock', description: 'A crushable ale to celebrate the end of winter and rejoice the coming of warm weather!', rating: 4.2, imageUrl: 'https://revbrew.com/imager/d37xww59oglu30_cloudfront_net/beer/SunCrusher-WebCan_7a380b392d6d6308eb7e6af7dcd28cdd.png', inventory: 100, ABV: 5.3, brewery: 'Revolution'
  }),
  Product.create({
    name: 'Anti-Hero', price: 10.00, status: 'In Stock', description: 'Our flagship IPA is supremely aromatic, crisp, and drinkable.', rating: 4.3, imageUrl: 'https://revbrew.com/imager/d37xww59oglu30_cloudfront_net/beer/antihero-can-NEW_7a380b392d6d6308eb7e6af7dcd28cdd.png', inventory: 200, ABV: 6.7, brewery: 'Revolution'
  }),
  Product.create({
    name: 'Eugene', price: 10.00, status: 'In Stock', description: 'A striking, robust porter full of warmth and chocolate malt.', rating: 4.3, imageUrl: 'https://revbrew.com/imager/d37xww59oglu30_cloudfront_net/beer/eugene-can-NEW_7a380b392d6d6308eb7e6af7dcd28cdd.png', inventory: 200, ABV: 6.8, brewery: 'Revolution'
  }),
  Product.create({
    name: 'Cross of Gold', price: 10.00, status: 'In Stock', description: 'An easy drinking golden ale for everyone.  Brewed to be crisp and refreshing with a bit of wheat malt for body and a delicate hop finish.', rating: 4.0, imageUrl: 'https://revbrew.com/imager/d37xww59oglu30_cloudfront_net/beer/COG-WebCan_7a380b392d6d6308eb7e6af7dcd28cdd.png', inventory: 100, ABV: 4.8, brewery: 'Revolution'
  }),
  Product.create({
    name: 'Rev Pils', price: 10.00, status: 'In Stock', description: 'Our Chicago Pilsner. Brewed traditionally German, with a slightly American approach.', rating: 4.8, imageUrl: 'https://revbrew.com/imager/d37xww59oglu30_cloudfront_net/beer/RevPils-WebCan_7a380b392d6d6308eb7e6af7dcd28cdd.png', inventory: 200, ABV: 5.5, brewery: 'Revolution'
  }),
])
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
}



// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
