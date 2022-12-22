const db = require('../models')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
class UserController {
  // [get] /
  async index(req, res) {
    const user = await db[req.user.permission].findOne({
      where: {
        id: req.user.id,
      },
    })
    res.json({ data: user })
  }
}

module.exports = new UserController()
