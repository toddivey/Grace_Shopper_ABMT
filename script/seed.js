'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', firstName: 'Cody', lastName: 'theDog', address: '123 Fake Street', password: '123secure'}),
    User.create({ email: 'fred@email.com', firstName: 'Fred', lastName: 'theCat', address: '554 Ashland Avenue', password: '123pasword' }),
    User.create({ email: 'kat@email.com', firstName: 'Kat', lastName: 'McPherson', address: '234 Elm Street', password: '12345' }),
    User.create({ email: 'sam@email.com', firstName: 'Sam', lastName: 'Calagione', address: '4567 Fun Street', password: 'funfunfun' }),
    User.create({ email: 'jesse@email.com', firstName: 'Jesse', lastName: 'Houck', address: '10 Downing Street', password: 'brewingitup' }),
    User.create({ email: 'sylvia@email.com', firstName: 'Sylvia', lastName: 'Plath', address: '902 First street', password: 'belljarring' }),
    User.create({ email: 'bailey@email.com', firstName: 'Bailey', lastName: 'Warren', address: '5346 Sheridan Place', password: 'neverstoprunning' }),
    User.create({ email: 'ray@email.com', firstName: 'Ray', lastName: 'Bradbury', address: '450 Learning Place', password: 'here2learn' }),
    User.create({ email: 'winston@email.com', firstName: 'Winston', lastName: 'Churchill', address: '279 Kool Kids drive', password: 'laterLozers' }),
    User.create({ email: 'plato@email.com', firstName: 'Plato', lastName: 'Philosopher', address: '6879 Herring Avenue', password: 'notinacave' })
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
