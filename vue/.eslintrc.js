// https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
// consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
var linters = process.env.NODE_ENV !== 'test' ? ['plugin:vue/recommended','@vue/standard'] : ['plugin:vue/base']
// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  env: {
    node: true
  },
  // required to lint *.vue files
  'extends': linters,
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "vue/attribute-hyphenation": ["error", "never", {
      "ignore": ["DD/MM/YYYY", "dd/mm/yyyy", "dd/mm/YYYY"]
    }],
    // allow async-await
    'generator-star-spacing': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/**/*.test.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
