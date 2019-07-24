const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
require('./models/User')
// require('./models/Survey');
require('./services/passport')

mongoose.Promise = global.Promise
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })

const app = express()

app.use(bodyParser.json())

app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT)

const host = server.address().address || 'localhost'
const port = server.address().port

console.info(`Server is listening at http://${host}:${port}`)
