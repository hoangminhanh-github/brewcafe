const db = require('../models')
const passport = require('passport')
const { Op } = require('sequelize')
const LocalStrategy = require('passport-local').Strategy
class ProductController {
  async test(req, res) {
    const hehe = await db.Product.findAll({
      include: {
        model: db.Band,
        attributes: ['name'],
      },
    })
    res.json(hehe)
  }
  // [get] /products/list/:user
  async getProductByUser(req, res) {
    let params = req?.query
    console.log(params)
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
    console.log(params)
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
