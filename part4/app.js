const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require("./controllers/users")
const loginRouter = require('./controllers/login')
const imagesRouter = require('./controllers/images')
const middleware = require('./utils/middleware')

app.use(cors())

// app.use(express.static('build'))
// app.use(express.static('/root/images'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.sessionExamine, middleware.userExtractor, blogsRouter)
app.use('/api/images', imagesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app