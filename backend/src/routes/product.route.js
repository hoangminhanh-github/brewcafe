const express = require('express')
const router = express.Router()
const ProductController = require('../controller/productController')

router.get('/list/user', ProductController.getProductByUser)
router.get('/list/user', ProductController.getProductByUser)
router.get('/detail', ProductController.getOneProduct)
router.get('/list/name', ProductController.getAllProductName)

router.get('/', ProductController.index)

module.exports = router
