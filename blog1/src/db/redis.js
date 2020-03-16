const redis = require('redis')
const { REDIS_CONF } = require('../conf/db.js')

const client = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

client.on('error', (err) => {
    console.log(err)
})

function set(key, val) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    client.set(key, val, redis.print)
}

function get(key) {
    const promise = new Promise((resolve, reject) => {
        client.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val == null || !val.length) {
                resolve(null)
                return
            }
            // 兼容JSON格式转换
            try {
                resolve(JSON.parse(val))
            } catch (err) {
                resolve(val)
            }
        })
    })
    return promise
}

module.exports = {
    set,
    get
}
