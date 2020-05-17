const Restaurant = require('../restaurant') // 載入 Restaurant model
const restaurantList = require('../../restaurant.json') // 載入 restaurant.json
const db = require('../../config/mongoose')

db.once('open', () => {
  restaurantList.results.forEach((restaurants) => {
    Restaurant.create({
      name: restaurants.name,
      name_en: restaurants.name_en,
      category: restaurants.category,
      image: restaurants.image,
      location: restaurants.location,
      phone: restaurants.phone,
      google_map: restaurants.google_map,
      rating: restaurants.rating,
      description: restaurants.description
    })
  })
  console.log('done')
})
