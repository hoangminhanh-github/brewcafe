const express = require('express')
const router = express.Router()
const UserController = require('../controller/userController')
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.get('/', passport.authenticate('jwt', { session: false }), UserController.index)

module.exports = router
