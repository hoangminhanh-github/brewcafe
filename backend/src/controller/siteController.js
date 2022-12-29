const db = require('../models')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const jwt = require('jsonwebtoken')
require('dotenv').config()
class SiteController {
  // [post] /auth
  async login(req, res, next) {
    const { email, password, permission = 'User' } = req.body
    try {
      const user = await db[permission].findOne({
        where: {
          email: email,
        },
      })
      const token = jwt.sign({ id: user.id, email: user.email, permission: user.permission }, process.env.SECRET_KEY, {
        expiresIn: '1d',
      })
      res.json({ data: user, token: `Bearer ${token}` })
    } catch {
      res.status(401).json('loi')
    }
  }
  // user là dùng chung cho cả 3 permission sau khi đã qua passport authenticate (check bên router)
  // [post]/auth/register
  async register(req, res, next) {
    const { name, email, password, confirmPassword, permission, avatar, age } = req.body
    const user = await db[permission].create({
      age,
      name,
      email,
      password,
      confirmPassword,
      permission,
    })
    res.json(user)
  }

  // [get] /
  test(req, res, next) {
    if (req.user.permission == 'User') {
      res.json('người dùng đéo đủ quyền để vào đây')
    } else {
      res.json('ok')
    }
  }
  async index(req, res) {
    const vendor = await db.Vendor.findAll()
    res.json(vendor)
  }
}

module.exports = new SiteController()
