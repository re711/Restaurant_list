const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant') // 載入 Restaurant model

const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

const db = mongoose.connection // 取得資料庫連線狀態

db.on('error', () => {
  console.log('mongodb error!') // 連線異常
})

db.once('open', () => {
  console.log('mongodb connected!') // 連線成功
})

// const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  Restaurant.find() // 取出 Restaurant model 裡的所有資料
    .lean() // 把 mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

// app.get('/restaurant/:restaurant_id', (req, res) => {
//   const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
//   res.render('show', { restaurant: restaurant })
// })

// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword
//   const restaurant = restaurantList.results.filter(restaurant => {
//     return restaurant.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) ||
//     restaurant.category.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
//   })
//   res.render('index', { restaurant: restaurant, keyword: keyword })
// })

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
