module.exports = {
  plugins: ["prettier", "@typescript-eslint", "@emotion"],
  extends: [
    "react-app",
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "prefer-const": [
      "error",
      {
        destructuring: "all",
      },
    ],
    "@emotion/pkg-renaming": "error",
    "react/self-closing-comp": ["warn"],
    "prettier/prettier": [
      "warn",
      {
        endOfLine: "auto",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        ignoreRestSiblings: true,
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-non-null-asserted-optional-chain": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      {
        assertionStyle: "as",
        objectLiteralTypeAssertions: "never"
      },
    ],
    "@typescript-eslint/prefer-optional-chain": ["warn"],
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        additionalHooks: "(useDataEffect)",
      },
    ],
  },
};