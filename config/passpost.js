const passpost = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
module.exports = app => {
  app.use(passpost.initialize())
  app.use(passpost.session())

  passpost.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered!' })
        }
        if (user.password !== password) {
          return done(null, false, { message: 'Email or Password incorrect.' })
        }
        return done(null, user)
      })
      .catch(err => done(err, false))
  }))
  passpost.serializeUser((user, done) => {
    done(null, user.id)
  })
  passpost.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
