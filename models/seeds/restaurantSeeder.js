const mongoose = require('mongoose') // 載入 mongoose
const Restaurant = require('../restaurant') // 載入 Restaurant model
const restaurantList = require('../../restaurant.json') // 載入 restaurant.json
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB
const db = mongoose.connection // 取得資料庫連線狀態
db.on('error', () => {
  console.log('mongodb error!') // 連線異常
})
db.once('open', () => {
  console.log('mongodb connected!') // 連線成功
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
