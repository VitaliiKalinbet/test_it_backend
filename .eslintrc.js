module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:prettier/recommended"
  ],
  "rules": {
    "dot-location": ["error", "property"],
    "eqeqeq": 2,
    "no-console": 1,
    "require-await": 1,
    "no-process-exit": 2,
    "array-bracket-spacing": ["error", "always", {
      "objectsInArrays": false,
      "singleValue": false,
      "objectsInArrays": false
    }],
    "block-spacing": ["error", "always"],
    "computed-property-spacing": ["error", "never"],
    // "comma-style": ["error", "last"],
    // "comma-dangle": ["error", "never"],
    "brace-style": ["error"],
    "func-call-spacing": ["error", "never"],
    "id-length": ["error", {
      "min": 2
    }],
    "array-bracket-newline": ["error", {
      "multiline": true,
      "minItems": 2
    }],
    "quote-props": ["error", "as-needed"],
    "quotes": ["error", "single", {
      "allowTemplateLiterals": true
    }],
    "semi": "error",
    "semi-spacing": "error",
    "no-extra-semi": "error",
    "node/exports-style": ["error", "module.exports"],
    "node/prefer-global/buffer": ["error", "always"],
    "node/prefer-global/console": ["error", "always"],
    "node/prefer-global/process": ["error", "always"],
    "node/prefer-global/url-search-params": ["error", "always"],
    "node/prefer-global/url": ["error", "always"],
    "node/no-unpublished-require": ["error", {
      "allowModules": ["morgan", "mongoose-morgan"]
    }]
  }
};
