const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const User = require('../user')
const Restaurant = require('../restaurant') // 載入 Restaurant model
const restaurantList = require('../../restaurant.json') // 載入 restaurant.json
const db = require('../../config/mongoose')
const SEED_USER = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
},
{
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678'
}]

db.once('open', () => {
  const promises = []
  SEED_USER.forEach(user => {
    promises.push(
      bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hash => User.create({
          name: user.name,
          email: user.email,
          password: hash
        }))
        .then(user => {
          const userId = user._id
          if (user.name === SEED_USER[0].name) {
            const seeds = restaurantList.results.slice(0, 4)
            seeds.forEach((seed) => {
              return Restaurant.create({
                name: seed.name,
                name_en: seed.name_en,
                category: seed.category,
                image: seed.image,
                location: seed.location,
                phone: seed.phone,
                google_map: seed.google_map,
                rating: seed.rating,
                description: seed.description,
                userId
              })
            })
          }
          if (user.name === SEED_USER[1].name) {
            const seeds = restaurantList.results.slice(4, 7)
            seeds.forEach((seed) => {
              return Restaurant.create({
                name: seed.name,
                name_en: seed.name_en,
                category: seed.category,
                image: seed.image,
                location: seed.location,
                phone: seed.phone,
                google_map: seed.google_map,
                rating: seed.rating,
                description: seed.description,
                userId
              })
            })
          }
        })
    )
    Promise.all(promises).then(() => {
      console.log('done')
      process.exit()
    })
  })
})
