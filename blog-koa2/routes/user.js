const { SuccessModel, ErrorModel } = require('../models/resModel.js')
const { login } = require('../controller/user')

module.exports = (router) => {
    router.prefix('/api')
    // 登录
    router.post('/user/login', async function(ctx, next) {
        const { username, password } = ctx.request.body
        const result = await login(username, password)

        if (result.username) {
            ctx.session.username = result.username
            ctx.session.realname = result.realname
            ctx.body = new SuccessModel(result)
            return
        }
        ctx.body = new ErrorModel('用户名或密码错误')
    })

    // 测试
    router.get('/user/loginTest', async function(ctx, next) {
        console.error('测试登录' + ctx.session.username)
        if (ctx.session.username) {
            ctx.body = new SuccessModel('已登录')
            return
        }
        ctx.body = new ErrorModel('未登录')
    })

    // 退出
    router.post('/user/loginout', function(ctx, next) {
        // 清除session
        ctx.session = null
        ctx.body = new SuccessModel('退出成功')
    })
}
