var createError = require('http-errors')
var express = require('express')
var fs = require('fs')
var path = require('path')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var RedisStore = require('connect-redis')(session)
var { redisClient } = require('./db/redis')
var logger = require('morgan')

var userRouter = require('./routes/user')
var blogRouter = require('./routes/blog')

var app = express()

const ENV = process.env.NODE_ENV
const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'log/access.log')
)
if (ENV !== 'dev') {
    app.use(logger('dev'))
} else {
    app.use(
        logger('combined', {
            stream: accessLogStream
        })
    )
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(
    session({
        secret: 'QWEDS&#AS2_2134asfas',
        cookie: {
            // path: '/',
            // httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        },
        store: new RedisStore({
            client: redisClient
        })
    })
)
// app.use(express.static(path.join(__dirname, "public")));

app.use('/api/user', userRouter)
app.use('/api/blog', blogRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'dev' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
