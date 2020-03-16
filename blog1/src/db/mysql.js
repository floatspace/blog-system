const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db.js')

const db = mysql.createConnection(MYSQL_CONF)
db.connect()

function exec(sql) {
    console.log('sql', sql)
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

module.exports = {
    exec,
    escape: mysql.escape
}
