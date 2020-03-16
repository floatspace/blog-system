class BaseModel {
    constructor(data, message) {
        // 处理data为字符串格式情况
        if (typeof data === 'string') {
            this.message = data
            data = null
            message = null
        }
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

// 成功model
class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errorno = 0
    }
}

// 失败model
class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errorno = -1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}
