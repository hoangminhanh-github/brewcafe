const express = require('express')
const router = express.Router()
const SiteController = require('../controller/siteController')
const passport = require('passport')
const jwt = require('jsonwebtoken')

router.post('/auth', SiteController.login)
router.get('/test', passport.authenticate('jwt', { session: false }), SiteController.test)
router.post('/auth/register', SiteController.register)

router.get('/', SiteController.index)

module.exports = router
