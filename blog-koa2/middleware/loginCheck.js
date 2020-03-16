let { ErrorModel } = require('../models/resModel.js')

// 用户登录检查中间件
const loginCheck = async (ctx, next) => {
    if (ctx.session.username) {
      await next()
      return
    }
    ctx.body = new ErrorModel('尚未登录')
}
module.exports = loginCheck
