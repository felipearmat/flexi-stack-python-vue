module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ['./tests/setup.js'],
  testMatch: ["**/tests/**/*.test.[jt]s?(x)"],
  // Adicionando o bootstrapVue para ser transpilado pelo babel
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!bootstrap-vue)'
  ],
}
