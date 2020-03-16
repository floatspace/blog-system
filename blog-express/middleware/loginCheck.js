let { ErrorModel } = require('../model/resModel.js')

// 用户登录检查中间件
function loginCheck(req, res, next) {
    if (!req.session.username) {
        res.json(new ErrorModel('尚未登录'))
        return
    }
    next()
}
module.exports = loginCheck
