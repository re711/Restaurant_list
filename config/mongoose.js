const mongoose = require('mongoose') // 載入 mongoose
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }) // 設定連線到 mongoDB
const db = mongoose.connection // 取得資料庫連線狀態

db.on('error', () => {
  console.log('mongodb error!') // 連線異常
})

db.once('open', () => {
  console.log('mongodb connected!') // 連線成功
})
module.exports = db
