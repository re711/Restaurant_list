const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 新增頁面
router.get('/create', (req, res) => {
  return res.render('create')
})

// 新增資料
router.post('/', (req, res) => {
  const userId = req.user._id
  const restaurant = req.body
  return Restaurant.create({
    name: restaurant.name,
    category: restaurant.category,
    image: restaurant.image,
    location: restaurant.location,
    phone: restaurant.phone,
    google_map: `https://www.google.com/maps/search/?api=1&query=${restaurant.location}`,
    description: restaurant.description,
    rating: restaurant.rating,
    userId
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 詳細資訊
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

// 編輯頁面
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const body = req.body
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant.name = body.name
      restaurant.category = body.category
      restaurant.location = body.location
      restaurant.google_map = `https://www.google.com/maps/search/?api=1&query=${body.location}`
      restaurant.phone = body.phone
      restaurant.rating = body.rating
      restaurant.description = body.description
      restaurant.image = body.image
      restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

// 刪除功能
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
