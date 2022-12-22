const siteRouter = require('./site.route')
const bandRouter = require('./band.route')
const userRouter = require('./user.router')
const productRouter = require('./product.route')
function route(app) {
  app.use('/product', productRouter)
  app.use('/band', bandRouter)
  app.use('/user', userRouter)
  app.use('/', siteRouter)
}

module.exports = route
