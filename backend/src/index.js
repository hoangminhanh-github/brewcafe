// import
const express = require('express')
const cors = require('cors')
const http = require('http')
const bodyParser = require('body-parser')
const route = require('./routes/index')
const db = require('./models')
const app = express()
const passport = require('passport')
const session = require('express-session')
require('./config/passport')

// passport session
const store = session.MemoryStore()
app.use(
  session({
    saveUninitialized: true,
    // secret: KEY_SESSION,
    secret: 'secret',
    cookie: {
      maxAge: 1000 * 10, // 10s
    },
    resave: true,
  }),
)

app.use(passport.initialize())
app.use(passport.session())
// passport session

app.use(cors())
const connectDB = require('./config/db')
// body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

route(app)
connectDB()
const server = http.createServer(app)

db.sequelize.sync().then(() => {
  server.listen(3001, () => {
    console.log('Server is running om port 3001')
  })
})
module.exports = passport
// { alter: true }
