const express = require('express')
const router = express.Router()
const ProductController = require('../controller/productController')
const upload = require('../middlewares/cloudinary-multer')

router.get('/list/user', ProductController.getProductByUser)
router.get('/list/user', ProductController.getProductByUser)
router.get('/detail', ProductController.getOneProduct)
router.get('/list/name', ProductController.getAllProductName)
router.delete('/delete', ProductController.deleteProducts)
router.post('/new', upload.array('image', 5), ProductController.setNewProduct)

router.get('/', ProductController.index)

module.exports = router
