// import
const express = require('express')
const cors = require('cors')
const http = require('http')
const bodyParser = require('body-parser')
const route = require('./routes/index')
const db = require('./models')
const passport = require('passport')
const session = require('express-session')
const connectDB = require('./config/db')
require('./config/passport')

const app = express()
const server = http.createServer(app)
// body-parser
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// express.urlencoded({ extended: true })

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

// app.use(
//   express.urlencoded({
//     extended: true,
//   }),
// )
route(app)
connectDB()

db.sequelize.sync().then(() => {
  server.listen(3001, () => {
    console.log('Server is running om port 3001')
  })
})
module.exports = passport
// { alter: true }
