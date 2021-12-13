module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 13
    },
    "rules": {
        "arrow-spacing": 2,
        "camelcase": [2, {"properties": "always"}],
        "no-trailing-spaces": 2,
        "quotes": ["error", "double"],
        "semi": ["error", "always"]
    }
};
