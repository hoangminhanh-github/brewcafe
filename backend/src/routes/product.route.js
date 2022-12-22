const express = require('express')
const router = express.Router()
const ProductController = require('../controller/productController')

router.get('/detail', ProductController.getOneProduct)
router.get('/', ProductController.index)

module.exports = router
