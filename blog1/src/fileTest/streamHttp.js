const fs = require('fs')
const path = require('path')
const http = require('http')

// 两个文件名
const fileName = path.resolve(__dirname, 'log.txt')

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    if (req.method === 'GET') {
        // 读取文件的stream对象
        const readStream = fs.createReadStream(fileName)
        readStream.pipe(res)
    }
})

server.listen(8001)
