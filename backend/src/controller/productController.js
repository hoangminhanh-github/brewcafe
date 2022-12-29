const db = require('../models')
const passport = require('passport')
const { Op } = require('sequelize')
const LocalStrategy = require('passport-local').Strategy
class ProductController {
  // [post] / product/new
  async setNewProduct(req, res, next) {
    try {
      const product = await db.Product.create(req.body)
      await req.files?.map((item) => {
        db.ProductImage.create({
          image: item.path,
          ProductId: product.id,
        })
      })
      res.status(200).json('SUCCESS')
    } catch (err) {
      res.status(401).json(err)
    }
  }
  //[get] /product/list/name
  async getAllProductName(req, res, err) {
    try {
      const listName = await db.Product.findAll({
        attributes: ['name', 'vendorEmail', 'leftIn'],
      })
      res.json(listName)
    } catch {
      res.status(401).json(err)
    }
  }
  // [get] /products/list/:user
  async getProductByUser(req, res) {
    let params = req?.query
    if (params.leftIn == '> 0') {
      params.leftIn = {
        [Op.gt]: 0,
      }
    }
    if (params.price) {
      params.price = {
        [Op.between]: params.price,
      }
    }
    const products = await db.Product.findAll({
      where: params,
    })
    res.json(products)
  }
  // [get] /product/:slug
  async getOneProduct(req, res) {
    const { id } = req.query
    const product = await db.Product.findOne({
      where: {
        id,
      },
      include: {
        model: db.ProductImage,
        attributes: ['image'],
      },
    })
    res.json(product)
  }
  // [get] /product/
  async index(req, res) {
    const { type, filterBandList = [], filterPriceList = [] } = req.query
    const productList = await db.Product.findAll({
      where: {
        type,
        bandName: filterBandList?.length
          ? {
              [Op.or]: filterBandList,
            }
          : { [Op.ne]: 'khongcothat' },
        price:
          filterPriceList?.length > 0
            ? {
                [Op.between]: filterPriceList[0].split('-'),
              }
            : {
                [Op.ne]: 'khongcothat',
              },
      },
      include: {
        model: db.ProductImage,
        attributes: ['image'],
      },
    })
    res.json(productList)
  }
}

module.exports = new ProductController()
