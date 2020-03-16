const fs = require('fs')
const path = require('path')

function createWriteStream(fileName) {
    const fullName = path.resolve(__dirname, '../', '../', 'logs', fileName)
    const writeStream = fs.createWriteStream(fullName, { flags: 'a' })
    return writeStream
}

function access(log) {
    const writeLog = createWriteStream('access.log')
    writeLog.write(log + '\n')
}

module.exports = {
    access
}
