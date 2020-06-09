const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 首頁
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean() // 把 mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

// 搜尋功能
router.get('/search', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword
  Restaurant.find({
    userId,
    $or: [{ name: new RegExp(keyword, 'i') }, { category: new RegExp(keyword, 'i') }]
  })
    .lean()
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(error => console.log(error))
})

// 排序功能
router.get('/sort/:by', (req, res) => {
  const sortBy = req.params.by
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort(sortBy)
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

module.exports = router
