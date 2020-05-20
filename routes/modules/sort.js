const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 排序功能
router.get('/:sorting/:order', (req, res) => {
  const sorting = req.params.sorting
  const order = req.params.order
  Restaurant.find()
    .lean()
    .sort({ [sorting]: [order] })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})
module.exports = router
