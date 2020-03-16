const fs = require('fs')
const path = require('path')

// 两个文件名
const fileName1 = path.resolve(__dirname, 'log.txt')
const fileName2 = path.resolve(__dirname, 'log-copy.txt')

// 读取文件的stream对象
const readStream = fs.createReadStream(fileName1)

// 写入文件的stream对象
const writeStream = fs.createWriteStream(fileName2)

// 执行拷贝
readStream.pipe(writeStream)

readStream.on('end', () => {
    console.log('拷贝完成')
})
