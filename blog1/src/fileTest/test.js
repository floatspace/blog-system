const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'log.txt')

// 读取文件
fs.readFile(fileName, (err, data) => {
    if (err) {
        console.log(err)
        return
    }
    // data是二进制, 需要转换为字符串格式
    console.log(data.toString())
})

// 写入文件
const content = '这是新写入的内容\n'
const opt = {
    flag: 'a' // 追加方式, 覆盖用'w'
}
fs.writeFile(fileName, content, opt, (error) => {
    if (error) {
        console.log(error)
    }
})

// 判断文件是否存在
fs.exists(fileName, (res) => {
    console.log(res)
})
