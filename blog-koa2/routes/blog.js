const loginCheck = require('../middleware/loginCheck')
let { SuccessModel, ErrorModel } = require('../models/resModel.js')
let {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
} = require('../controller/blog.js')

module.exports = (router) => {
    // 博客列表
    router.get('/blog/list', async (ctx, next) => {
        const loginAuthor = ctx.session.username
        // 获取查询参数
        let author = ctx.request.query.author || ''
        const keyword = ctx.request.query.keyword || ''

        author = loginAuthor || ''

        // 获取data
        const res = await getList(author, keyword)
        ctx.body = new SuccessModel(res)
    })

    // 博客详情
    router.get('/blog/detail', async (ctx, next) => {
        const res = await getDetail(ctx.request.query.id)
        if (res) {
            ctx.body = new SuccessModel(res)
        }
    })

    // 新增博客
    router.post('/blog/new', loginCheck, async (ctx, next) => {
        // 获取数据
        const { title, content } = ctx.request.body
        const { username } = ctx.session
        const blogData = { title, content, username }

        const insertId = await newBlog(blogData)
        if (insertId) {
            ctx.body = new SuccessModel({ id: insertId })
            return
        }
        ctx.body = new ErrorModel('更新失败')
    })

    // 更新博客
    router.post('/blog/update', loginCheck, (ctx, next) => {
        // 获取数据
        const { id, title, content } = ctx.request.body
        let blogData = { title, content }

        const res = updateBlog(id, blogData)
        if (res) {
            ctx.body = new SuccessModel('更新成功')
            return
        }
        ctx.body = new ErrorModel('更新失败')
    })

    // 删除博客
    router.post('/blog/del', loginCheck, (ctx, next) => {
        const { id } = ctx.request.body
        const { username } = ctx.session
        const res = deleteBlog(id, username)
        if (res) {
            ctx.body = new SuccessModel('删除成功')
            return
        }
        ctx.body = new ErrorModel('删除失败')
    })
}
