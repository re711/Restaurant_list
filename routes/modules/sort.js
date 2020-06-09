const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/restaurants/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})
module.exports = router
