'use strict'

const db = require('../server/db')
const {User, Order, Cart} = require('../server/db/models')

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
