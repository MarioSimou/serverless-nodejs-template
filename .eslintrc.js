module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module",
        "babelOptions": {
            "configFile": "babel.config.js"
        }
    },
    "globals": {
        "process": true,
        "describe": true,
        "it": true,
        "expect": true,
    },
    "rules": {
        "no-console": 2,
        "no-empty": 2,
        "no-dupe-else-if": 2,
        "no-dupe-args":2,
        "no-extra-parens":0,
        "no-setter-return": 2,
        "no-unreachable": 2,
        "no-sparse-arrays": 2,
        "arrow-spacing": 2,
        "comma-dangle": 0,
        "no-cond-assign": 2,
        "no-constant-condition": 2,
        "no-control-regex": 2,
        "no-debugger": 2,
        "no-dupe-keys": 2,
        "no-duplicate-case": 2,
        "no-empty-character-class": 2,
        "no-ex-assign": 2,
        "no-extra-boolean-cast": 2,
        "no-extra-semi": 2,
        "no-func-assign": 2,
        "no-inner-declarations": 2,
        "no-invalid-regexp": 2,
        "no-irregular-whitespace": 2,
        "no-negated-in-lhs": 2,
        "no-obj-calls": 2,
        "no-regex-spaces": 2,
        "no-unexpected-multiline": 2,
        "use-isnan": 2,
        "valid-jsdoc": 2,
        "valid-typeof": 2,
        "no-redeclare": 2,
        "no-unused-vars": 2,
    }
};
