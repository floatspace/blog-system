let { SuccessModel, ErrorModel } = require('../model/resModel.js')
let {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
} = require('../controller/blog.js')

// 登录验证
const loginCheck = (req) => {
    if (!req.session.username) {
        return new ErrorModel('用户尚未登录')
    }
}

const handleBlogRouter = (req, res) => {
    const { method, url } = req
    const path = url.split('?')[0]

    // author假数据, 后续需从登录信息中取
    // req.body.author = req.session.username

    // 获取博客列表
    if (method === 'GET' && path === '/api/blog/list') {
        // 参数不存在情况处理-todo
        if (typeof req.query === 'undefined') {
            return Promise.resolve(new ErrorModel('没有查询参数'))
        }

        // 获取查询参数
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''

        // if (req.session.username !== author) {
        //     return Promise.resolve(new ErrorModel('只能查询本人博客列表'))
        // }

        // 获取data
        return getList(author, keyword).then((data) => {
            return new SuccessModel(data)
        })
    }

    // 获取博客详情
    if (method === 'GET' && path === '/api/blog/detail') {
        const dataResult = getDetail(req.query.id)

        return dataResult.then((detailData) => {
            return new SuccessModel(detailData)
        })
    }

    // 新建博客
    if (method === 'POST' && path === '/api/blog/new') {
        // 登录验证
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            return Promise.resolve(loginCheckResult)
        }

        // 获取数据
        // req.body中有title, content
        let blogData = { ...req.body }
        blogData.username = req.session.username

        return newBlog(blogData).then((insertId) => {
            return new SuccessModel({ id: insertId })
        })
    }

    // 更新博客
    if (method === 'POST' && path === '/api/blog/update') {
        // 登录验证
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            return Promise.resolve(loginCheckResult)
        }

        // 获取数据
        // req.body中有title, content
        let blogData = { ...req.body }
        blogData.username = req.session.username

        return updateBlog(blogData.id, blogData).then((result) => {
            if (result) {
                return Promise.resolve(new SuccessModel('更新成功'))
            }
            return Promise.resolve(new ErrorModel('更新失败'))
        })
    }

    // 删除博客
    if (method === 'POST' && path === '/api/blog/del') {
        // 登录验证
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            return Promise.resolve(loginCheckResult)
        }

        let { id } = { ...req.body }
        return deleteBlog(id, req.session.username).then((result) => {
            if (result) {
                return Promise.resolve(new SuccessModel('删除成功'))
            }
            return Promise.resolve(new ErrorModel('删除失败'))
        })
    }
}

module.exports = handleBlogRouter
