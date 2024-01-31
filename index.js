module.exports = {
  extends: [
    '@antfu/eslint-config',
  ],
  rules: {
    'no-console': 'off',
    // https://eslint.vuejs.org/rules/singleline-html-element-content-newline.html
    // button 标签会强制换行
    'vue/singleline-html-element-content-newline': [
      'error',
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        externalIgnores: ['button', 'option'],
      },
    ],
  },
}
