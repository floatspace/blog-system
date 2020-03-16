const env = process.env.NODE_ENV

let MYSQL_CONF = null
let REDIS_CONF = null

// 开发环境
if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123',
        database: 'myblog'
    }
    REDIS_CONF = {
        host: '127.0.0.1',
        port: 6379
    }
}

// 线上环境
if (env === 'production') {
    // 实际要调整
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123',
        database: 'myblog'
    }
    REDIS_CONF = {
        host: '127.0.0.1',
        port: 6379
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}
