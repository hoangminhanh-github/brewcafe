const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport')
const opts = {}
const db = require('../models')
require('dotenv').config
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRET_KEY

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    db[jwt_payload.permission]
      .findOne({
        where: {
          id: jwt_payload.id,
        },
      })
      // user ở đây là dùng chung cho cả admin/user/vendor
      .then((user) => {
        //if the user is found
        if (user) {
          return done(null, {
            id: user.id,
            email: user.email,
            permission: user.permission,
          })
        } else {
          return done(new Error('User not found'), null)
        }
      })
      .catch((err) => {
        console.log(err)
        return done(new Error('uncaught error! try again later'), null)
      })
  }),
)
