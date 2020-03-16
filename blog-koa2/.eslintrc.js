module.exports = {
    // 使用的扩展库
    extends: ['standard', 'plugin:vue/recommended'],
    // 解析器配置
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    // 可以全局使用变量
    globals: {},
    // 第三方插件
    plugins: ['html'],
    // 规则配置
    rules: {
        // 关闭函数括号前的空格验证
        'space-before-function-paren': 0,
        indent: ['error', 2],
        'no-return-await': 0
    }
}
