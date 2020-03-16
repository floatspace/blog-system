let { exec } = require('../db/mysql.js')
let xss = require('xss')

// 获取博客列表 - 根据作者或关键词
const getList = async (author, keyword) => {
    let sql = 'select * from blogs where 1=1 '
    if (author) {
        sql += `and author='${author}'`
    }
    if (keyword) {
        sql += `and title like '%${keyword}%'`
    }
    sql += ';'

    const res = await exec(sql)
    return res
}

// 获取博客详情 - 根据博客id
const getDetail = async (id) => {
    let sql = `select * from blogs where id=${id}`
    const rows = await exec(sql)
    if (rows) {
        return rows[0]
    }
}

// 新增博客
const newBlog = async (blogData) => {
    blogData['createtime'] = Date.now()
    let { title, content, createtime, username } = blogData
    let sql = `insert into blogs (title, content, createtime, author) values ('${title}', '${content}', '${createtime}', '${username}')`
    const row = await exec(sql)
    if (row.insertId) {
        return row.insertId
    }
}

// 更新博客
const updateBlog = async (id, blogData) => {
    let createtime = Date.now()

    let { title, content } = blogData
    title = xss(title)

    let sql = `update blogs set title='${title}', content='${content}', createtime='${createtime}' where id='${id}'`
    const row = await exec(sql)

    if (row.affectedRows > 0) {
        return true
    }
    return false
}

// 删除博客
const deleteBlog = async (id, author) => {
    let sql = `delete from blogs where id='${id}' and author='${author}'`
    const row = exec(sql)
    if (row.affectedRows > 0) {
        return true
    }
    return false
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}
