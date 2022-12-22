const db = require('../models')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
class BandController {
  // [get] /
  async index(req, res) {
    const bandList = await db.Band.findAll()
    res.json(bandList)
  }
}

module.exports = new BandController()
