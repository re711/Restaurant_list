const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()
const port = 3000

const routes = require('./routes')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

const db = mongoose.connection // 取得資料庫連線狀態

db.on('error', () => {
  console.log('mongodb error!') // 連線異常
})

db.once('open', () => {
  console.log('mongodb connected!') // 連線成功
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
