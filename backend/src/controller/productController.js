const db = require('../models')
const passport = require('passport')
const { Op } = require('sequelize')
const LocalStrategy = require('passport-local').Strategy

const PRODUCT_ON_PAGE = 6
class ProductController {
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
    let { params, paranoid, offset = 0, limit = PRODUCT_ON_PAGE, sort = 'id', order_by = 'asc' } = req?.query
    if (params?.leftIn == '> 0') {
      params.leftIn = {
        [Op.gt]: 0,
      }
    }
    if (params.price) {
      params.price = {
        [Op.between]: params.price,
      }
    }
    try {
      const amount = await db.Product.count({
        where: {
          VendorId: params.VendorId,
        },
      })
      let products = []
      if (paranoid == 'false') {
        products = await db.Product.findAll({
          where: {
            ...params,
            deletedAt: {
              [Op.not]: null,
            },
          },
          include: {
            model: db.ProductImage,
          },
          limit: Number(limit),
          offset: offset > 1 ? Number(limit * (offset - 1)) : 0,
          order: [[sort, order_by]],
          paranoid: false,
        })
      } else {
        products = await db.Product.findAll({
          where: {
            ...params,
          },
          include: {
            model: db.ProductImage,
          },
          limit: Number(limit),
          offset: offset > 1 ? Number(limit * (offset - 1)) : 0,
          order: [[sort, order_by]],
          paranoid,
        })
      }
      res.json({ data: products, amount })
    } catch (err) {
      res.status(401).json(err)
    }
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
    const {
      type,
      filterBandList = [],
      filterPriceList = [],
      offset = 1,
      limit = PRODUCT_ON_PAGE,
      sort = 'name',
      order_by = 'asc',
    } = req.query
    try {
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
        },
        offset: offset > 1 ? Number(PRODUCT_ON_PAGE * (offset - 1)) : 0,
        limit: Number(limit),
        order: (sort && order_by && [[sort, order_by]]) || [['id', 'asc']],
      })
      const amount = await db.Product.count({
        where: {
          type,
        },
      })
      res.json({ data: productList, amount })
    } catch (err) {
      res.status(401).json(err)
    }
  }

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
  // [patch] /product/edit/:id
  async editProduct(req, res, next) {
    const { body, params, files } = req
    const { oldImage } = body

    try {
      const product = await db.Product.findOne({
        where: {
          id: params.id,
        },
      })
      await product.update(body)
      await db.ProductImage.destroy({
        where: {
          ProductId: params.id,
          id: { [Op.ne]: oldImage },
        },
        // force: true,
      })
      await files.map((item) => {
        db.ProductImage.create({
          image: item.path,
          ProductId: product.id,
        })
      })
      res.json('ok')
    } catch (err) {
      res.status(401)
    }
  }

  // [delete] /product/delete/:id
  async deleteProducts(req, res) {
    const productDeleteList = req.body
    try {
      const products = await db.Product.findAll({
        where: {
          id: {
            [Op.or]: productDeleteList,
          },
        },
      })
      products.forEach(async (item) => {
        await db.Product.update(
          { state: 'Ngừng kinh doanh', deletedAt: Date.now() },
          {
            where: {
              id: item.id,
            },
          },
        )
      })
      res.status(200).json('Delete success')
    } catch (err) {
      res.status(401).json(err)
    }
  }
}

module.exports = new ProductController()
