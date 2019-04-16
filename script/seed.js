'use strict'

const db = require('../server/db')
const {User, Review, Categories, Order, Cart} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const orders = await Promise.all([
    Order.create({created_at: '2019-01-29 00:00:00.000 +00:00', shipping_status: 'delivered', tracking_num:'1Z-1234-60657', delivered: 'true', total:'10000'}),
    Order.create({created_at: '2019-02-15 00:00:00.000 +00:00', shipping_status: 'delivered', tracking_num:'1Z-1235-60657', delivered: 'true', total:'15000'}),
    Order.create({created_at: '2019-03-20 00:00:00.000 +00:00', shipping_status: 'delivered', tracking_num:'1Z-1236-60657', delivered: 'true', total:'12000'}),
    Order.create({created_at: '2019-04-13 00:00:00.000 +00:00', shipping_status: 'shipped', tracking_num:'1Z-1237-60657', delivered: 'false', total:'8000'}),
    Order.create({created_at: '2019-04-14 00:00:00.000 +00:00', shipping_status: 'processing', delivered: 'false', total:'9000'}),
  ])

  const carts = await Promise.all([
    Cart.create({status: 'completed', created_at:'2019-01-29 00:00:00.000 +00:00', closed_at:'2019-01-29 00:00:00.000 +00:00', total: '10000'}),
    Cart.create({status: 'completed', created_at:'2019-02-15 00:00:00.000 +00:00', closed_at:'2019-02-15 00:00:00.000 +00:00', total: '15000'}),
    Cart.create({status: 'completed', created_at:'2019-03-20 00:00:00.000 +00:00', closed_at:'2019-03-20 00:00:00.000 +00:00', total: '12000'}),
    Cart.create({status: 'completed', created_at:'2019-04-13 00:00:00.000 +00:00', closed_at:'2019-04-13 00:00:00.000 +00:00', total: '8000'}),
    Cart.create({status: 'completed', created_at:'2019-04-14 00:00:00.000 +00:00', closed_at:'2019-04-14 00:00:00.000 +00:00', total: '9000'}),
    Cart.create({status: 'open', created_at:'2019-04-16 00:00:00.000 +00:00', total: '7000'})
    
  ])

  const review = await Promise.all([
    Review.create({content: "Here is a wonderful review about a Bourbon County. It was delicious, I would drink more of it.", rating: 9}),
    Review.create({content: "Bud light tastes terrible, hate it. Would only drink if its free.", rating: 2}),
    Review.create({content: "Great Lakes Dortumunder is tasty. An easy drinkable beer that I would be happy to have more of", rating: 8}),
    Review.create({content: "Pipeworks makes some crazy mash ups and their can design is awesome.", rating: 8}),
    Review.create({content: "Two Heated Ale Loved this beer! Nice fruity accents emboldening the hops.", rating: 8}),
    Review.create({content: 'Thickest stout I’ve ever had. Chocolate candy bars, fudge, brownies, and some espresso as it warmed. Perfect ba stout.', rating: 10}),
    Review.create({content: 'Subtle fruity/juicy mixed with little taste of hops', rating: 8}),
    Review.create({content: 'Apex Predator is a tasting saison/farmhouse ale from Off Color', rating: 7}),
    Review.create({content: 'Metropolitan Krankshaft is clear and true to style.', rating: 7}),
    Review.create({content: 'Revolotion Anti-Hero is a staple of Chicago beers. Crisp and drinkable', rating: 8})

  ])

  const categories = await Promise.all([
    Categories.create({style: 'Stout', description: 'Stout, not as sweet to the taste, features a rich, creamy head and is flavoured and coloured by barley. Stouts often use a portion of unmalted roasted barley to develop a dark, slightly astringent, coffee-like character.'}),
    Categories.create({style: 'Ale', description: 'Ales are often darker than lagers, ranging from rich gold to reddish amber. Top fermenting, and more hops in the wort gives these beers a distinctive fruitfulness, acidity and pleasantly bitter seasoning. Ales have a more assertive, individual personality than lager, though their alcoholic strength is the same.'}),
    Categories.create({style: "Lagers", description: "A lager, which can range from sweet to bitter and pale to black, is usually used to describe bottom-fermented brews of Dutch, German, and Czech styles. Most, however, are a pale to medium colour, have high carbonation, and a medium to high hop flavour."}),
    Categories.create({style: 'Porter', description: 'Porter is a dark, almost black, fruity-dry, top fermenting style. An ale, porter is brewed with a combination of roasted malt to impart flavour, colour and aroma. Stout is also a black, roast brew made by top fermentation.'}),
    Categories.create({style: 'Indian Pale Ale', description: 'A hoppier version of pale ale. Originally brewed in England with extra hops to survive the journey to British troops stationed in India.' }),
    Categories.create({style: 'Pale ALe', description: 'Pale ale has a fruity, copper-coloured styler. It originiated from England. Pale ales are robust beers that can be enjoyed with strongly spiced foods.'}),
    Categories.create({style:'Brown', description:'Dark amber or brown in colour, brown ale have evidence of caramel and chocolate flavours and may have a slight citrus accent or be strong, malty or nutty, depending on the area of brewing.'}),
    Categories.create({style:'Fruit', description:'Most fruit beers are ales however, they typically do not carry an ale character. In order to allow for the fruit flavor to come through nicely, the malt’s flavor is not dominant and there is a low bitterness level to the beer.'}),
    Categories.create({style:'Wheat', description:'Light and easy to drink with very little aftertaste. Wheat provides a soft character to beer and is sometimes hazy or cloudy with a touch of spice notes.'}),
    Categories.create({style:'Pilsner', description:'Made with neutral and hard water. Tend to be golden in colour with a dry, crisp, and somewhat bitter flavour. Pilsner stands out from other lagers due to its more distinctive hop taste.'})
  ])

  console.log(`seeded ${categories.length} categories`)
  console.log(`seeded ${review.length} reviews`)
  console.log(`seeded ${users.length} users`)
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
