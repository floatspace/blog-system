let { exec, escape } = require('../db/mysql.js')
let { genPassword } = require('../utils/crypto.js')

const login = async (username, password) => {
    username = escape(username)
    password = escape(password)

    password = genPassword(password)

    let sql = `select * from users where username=${username} and password='${password}';`

    const rows = await exec(sql)
    if (rows.length) {
        return {
            username: rows[0].username,
            realname: rows[0].realname
        }
    }
    return {}
}

module.exports = {
    login
}
