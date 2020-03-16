var express = require('express')
var router = express.Router()
const { SuccessModel, ErrorModel } = require('../model/resModel.js')

const { login } = require('../controller/user')

router.post('/login', function(req, res, next) {
    const { username, password } = req.body
    return login(username, password).then((data) => {
        if (data.username) {
            req.session.username = data.username
            req.session.realname = data.realname
            res.json(new SuccessModel(data))
            return
        }
        res.json(new ErrorModel('用户名或密码错误'))
    })
})

router.post('/loginout', function(req, res, next) {
    // 清除session
    req.session.destroy()
    res.json(new SuccessModel('退出成功'))
})

/* loginTest */
router.get('/loginTest', function(req, res, next) {
    if (req.session.username) {
        res.json(new SuccessModel('已登录'))
    } else {
        res.json(new ErrorModel('尚未登录'))
    }
})

module.exports = router
