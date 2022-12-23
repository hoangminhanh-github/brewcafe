const express = require('express')
const router = express.Router()
const ProductController = require('../controller/productController')

router.get('/list/user', ProductController.getProductByUser)
router.get('/test', ProductController.test)

router.get('/detail', ProductController.getOneProduct)
router.get('/', ProductController.index)

module.exports = router
