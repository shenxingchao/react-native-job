module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['prettier'], //prettier放最后解决冲突
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    quotes: ['error', 'single'], //强制使用单引号
    semi: ['error', 'never'], //强制不使用分号结尾
    'no-unused-vars': 0 //变量未定义不提示
  }
}
