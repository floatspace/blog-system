const querystring = require('querystring')

const handleBlogRouter = require('./src/router/blog.js')
const handleUserRouter = require('./src/router/user.js')

const { get } = require('./src/db/redis')

const { access } = require('./src/utils/log.js')

// 统一处理postData
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        // 不满足条件判断
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'].indexOf('application/json') === -1) {
            resolve({})
            return
        }
        // 处理postData
        let postData = ''
        req.on('data', (chunk) => {
            postData += chunk
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
    return promise
}

// session数据
// let SESSION_DATA = {}

const serverHandle = (req, res) => {
    // 记录访问日志
    access(
        `${req.method} -- ${req.url} -- ${
            req.headers['user-agent']
        } -- ${Date.now()}`
    )

    // 设置返回格式为JSON
    res.setHeader('Content-type', 'application/json')

    // 解析query
    const url = req.url
    req.query = querystring.parse(url.split('?')[1])

    // 解析cookie
    req.cookie = parseCookie(req.headers.cookie)

    // 解析session
    let needSetCookie = false
    let sessionId = req.cookie.sessionId

    req.sessionId = sessionId
    req.session = {}

    if (sessionId) {
        get(sessionId).then((val) => {
            req.session = val != null ? val : {}

            // 处理postdata数据
            handlePostData()
        })
    } else {
        needSetCookie = true
        sessionId = `${Date.now()}_${Math.random()}`
        req.sessionId = sessionId

        // 处理postdata数据
        handlePostData()
    }

    // 处理postData
    function handlePostData() {
        getPostData(req).then((postData) => {
            req.body = postData
            // 处理路由
            handleRouter()
        })
    }

    // 处理路由
    function handleRouter() {
        // 处理blog路由
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            // 登录成功后，设置cookie
            if (needSetCookie) {
                res.setHeader(
                    'Set-Cookie',
                    `sessionId=${sessionId}; path=/; httpOnly; expires=${getCookieExpires()}`
                )
            }
            blogResult.then((blogData) => {
                res.end(JSON.stringify(blogData))
            })
            return
        }

        // 处理user路由
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then((result) => {
                // 登录成功后，设置cookie
                if (needSetCookie) {
                    res.setHeader(
                        'Set-Cookie',
                        `sessionId=${sessionId}; path=/; httpOnly; expires=${getCookieExpires()}`
                    )
                }
                res.end(JSON.stringify(result))
            })
            return
        }

        // 未命中情况处理
        res.writeHead(404, { 'Content-type': 'text/plain' })
        res.write('404 Not Found\n')
        res.end()
    }
}

// 解析cookie
const parseCookie = (cookieStr) => {
    let res = {}
    if (!cookieStr) {
        return res
    }
    // 'k1=v1;k2=v2'
    cookieStr.split(';').forEach((item) => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const value = arr[1].trim()
        res[key] = value
    })
    return res
}

// 获取cookie过期时间
const getCookieExpires = () => {
    let d = new Date()
    d.setTime(d.getTime() + 15 * 60 * 1000)
    return d.toGMTString()
}

module.exports = serverHandle
