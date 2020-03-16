const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { REDIS_CONF } = require('./config/db')

const debug = require('debug')('koa2:server')
const fs = require('fs')
const path = require('path')
const morgan = require('koa-morgan')

const config = require('./config')

const blog = require('./routes/blog')
const user = require('./routes/user')

const port = process.env.PORT || config.port

// error handler
onerror(app)

// session配置
// 注意顺序，需要放到use(router.routes())之前
app.keys = ['QWEDS&#AS2_2134asfas']
app.use(
    session({
        cookie: {
            maxAge: 24 * 60 * 60 * 1000
        },
        store: redisStore({
            all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
        })
    })
)

// 日志记录
const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
    app.use(morgan('dev'))
} else {
    const logFileName = path.join(__dirname, 'logs/access.log')
    const writeStream = fs.createWriteStream(logFileName, { flags: 'a' })
    app.use(
        morgan('combined', {
            stream: writeStream
        })
    )
}

// middlewares
app.use(bodyparser())
    .use(json())
    .use(logger())
    .use(router.routes())
    .use(router.allowedMethods())

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - $ms`)
})

router.get('/', async (ctx, next) => {
    // ctx.body = 'Hello World'
    ctx.state = {
        title: 'Koa2'
    }
    await (ctx.body = 'Hello World')
})

blog(router)
user(router)

app.on('error', function(err, ctx) {
    console.log(err)
    logger.error('server error', err, ctx)
})

module.exports = app.listen(config.port, () => {
    console.log(`Listening on http://localhost:${config.port}`)
})
