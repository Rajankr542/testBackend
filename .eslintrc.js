module.exports = {
  extends: ["airbnb-base", "prettier"],
  env: {
    es6: true,
    node: true,
  },
  rules: {
    "linebreak-style": 0,
    "no-param-reassign": 0,
    "no-underscore-dangle": 0,
    "no-return-await": 0,
    "no-case-declarations": 0,
    camelcase: 0,
    "no-restricted-syntax": 0,
    "no-await-in-loop": 0,
    "prettier/prettier": "error",
    "max-len": [1, { code: 80 }],
    "quotes": [2, "single", { avoidEscape: true }],
    "import/prefer-default-export": "off",
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  parser: "babel-eslint",
  plugins: ["prettier"],
};
