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
  const user2 = SEED_USER[1]
  const user1 = SEED_USER[0]
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(user1.password, salt))
    .then(hash => User.create({
      name: user1.name,
      email: user1.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      const seed1 = restaurantList.results.slice(0, 3)
      return Promise.all(Array.from(
        { length: seed1.length },
        (_, i) =>
          Restaurant.create({
            name: seed1[i].name,
            name_en: seed1[i].name_en,
            category: seed1[i].category,
            image: seed1[i].image,
            location: seed1[i].location,
            phone: seed1[i].phone,
            google_map: seed1[i].google_map,
            rating: seed1[i].rating,
            description: seed1[i].description,
            userId
          })
      ))
    })
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(user2.password, salt))
    .then(hash => User.create({
      name: user2.name,
      email: user2.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      const seed2 = restaurantList.results.slice(4, 7)
      return Promise.all(Array.from(
        { length: seed2.length },
        (_, i) =>
          Restaurant.create({
            name: seed2[i].name,
            name_en: seed2[i].name_en,
            category: seed2[i].category,
            image: seed2[i].image,
            location: seed2[i].location,
            phone: seed2[i].phone,
            google_map: seed2[i].google_map,
            rating: seed2[i].rating,
            description: seed2[i].description,
            userId
          })
      ))
    })
    .then(() => {
      console.log('done')
      process.exit()
    })
})
