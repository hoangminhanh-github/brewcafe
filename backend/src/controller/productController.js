const db = require('../models')
const passport = require('passport')
const { Op } = require('sequelize')
const LocalStrategy = require('passport-local').Strategy
class ProductController {
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
