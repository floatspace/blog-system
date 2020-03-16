var express = require('express')
var router = express.Router()
const loginCheck = require('../middleware/loginCheck')
let { SuccessModel, ErrorModel } = require('../model/resModel.js')
let {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
} = require('../controller/blog.js')

// 博客列表
router.get('/list', (req, res, next) => {
    const loginAuthor = req.session.username
    // 获取查询参数
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''

    author = loginAuthor || ''

    // 获取data
    return getList(author, keyword).then((data) => {
        res.json(new SuccessModel(data))
    })
})

// 博客详情
router.get('/detail', (req, res, next) => {
    const dataResult = getDetail(req.query.id)

    return dataResult.then((detailData) => {
        res.json(new SuccessModel(detailData))
    })
})

// 新增博客
router.post('/new', loginCheck, (req, res, next) => {
    // todo-登录验证

    // 获取数据
    const { title, content } = req.body
    const { username } = req.session
    let blogData = { title, content, username }

    return newBlog(blogData).then((insertId) => {
        res.json(new SuccessModel({ id: insertId }))
    })
})

// 更新博客
router.post('/update', loginCheck, (req, res, next) => {
    // 获取数据
    const { id, title, content } = req.body
    let blogData = { title, content }

    return updateBlog(id, blogData).then((result) => {
        if (result) {
            res.json(new SuccessModel('更新成功'))
        }
        return res.json(new ErrorModel('更新失败'))
    })
})

// 删除博客
router.post('/del', loginCheck, (req, res, next) => {
    const { id } = req.body
    const { username } = req.session
    return deleteBlog(id, username).then((result) => {
        if (result) {
            return res.json(new SuccessModel('删除成功'))
        }
        return res.json(new ErrorModel('删除失败'))
    })
})

module.exports = router
