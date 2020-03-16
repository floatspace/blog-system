const { SuccessModel, ErrorModel } = require('../model/resModel.js')
const { login } = require('../controller/user.js')

const { get, set } = require('../db/redis')

const handleUserRouter = (req, res) => {
    const { method, url } = req
    const path = url.split('?')[0]

    // 用户登录
    if (method === 'POST' && path === '/api/user/login') {
        const { username, password } = req.body
        return login(username, password).then((data) => {
            // 设置session, 这里对req赋值的同时也赋值给了对应的SESSION_DATA[userId]
            if (!data.username) {
                return new ErrorModel('用户名或密码错误')
            }
            req.session.username = data.username
            req.session.realname = data.realname
            // 设置redis
            set(req.sessionId, req.session)

            return new SuccessModel(data)
        })
    }

    // 用户退出
    if (method === 'POST' && path === '/api/user/loginout') {
        set(req.sessionId, '')
        req.session = {}
        return Promise.resolve(new SuccessModel('退出成功'))
    }

    // 用户登录测试
    if (method === 'GET' && path === '/api/user/loginTest') {
        if (req.session && req.session.username) {
            return Promise.resolve(new SuccessModel('登录成功'))
        }
        return Promise.resolve(new ErrorModel('尚未登录'))
    }
}

module.exports = handleUserRouter
