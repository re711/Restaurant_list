const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

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

// 首頁
app.get('/', (req, res) => {
  Restaurant.find() // 取出 Restaurant model 裡的所有資料
    .lean() // 把 mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

app.use(bodyParser.urlencoded({ extended: true }))

// 新增頁面
app.get('/restaurants/create', (req, res) => {
  return res.render('create')
})

// 新增資料
app.post('/restaurants', (req, res) => {
  const restaurant = req.body
  return Restaurant.create({
    name: restaurant.name,
    category: restaurant.category,
    image: restaurant.image,
    location: restaurant.location,
    phone: restaurant.phone,
    google_map: `https://www.google.com/maps/search/?api=1&query=${restaurant.location}`,
    description: restaurant.description,
    rating: restaurant.rating
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 詳細資訊
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

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
