const experss = require('express')
const router = experss.Router()

router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router
