const express = require('express')
const router = express.Router()
const BandController = require('../controller/bandController')

router.get('/', BandController.index)

module.exports = router
