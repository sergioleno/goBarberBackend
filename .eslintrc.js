module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "no-console": "off", //desabilita erro console.log
    "prettier/prettier": "error",
    "class-methods-use-this": "off", //evita regra eslint que obriga todo método da classe a usar this
    "no-param-reassign": "off", //permite alterar parâmetros recebidos(o eslint nao permite). necessário para usar sequelize
    camelcase: "off", //em alguns momentos não da
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }] //às vezes a variável next será necessária nos middlewares
  }
};
