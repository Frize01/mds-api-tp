import prettier from 'eslint-plugin-prettier';
import stylistic from '@stylistic/eslint-plugin';

export default [
  {
    ignores: ["node_modules"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script",
      globals: {
        browser: true,
        node: true,
        commonjs: true,
      },
    },
    plugins: {
      prettier,
      stylistic,
    },
    rules: {
      "no-console": "off",
      "prettier/prettier": [
        "error",
        {
          printWidth: 80,
          tabWidth: 2,
          useTabs: false,
          semi: true,
          singleQuote: false,
          quoteProps: "consistent",
          trailingComma: "all",
          bracketSpacing: true,
          bracketSameLine: false,
          arrowParens: "always",
          endOfLine: "auto",
          singleAttributePerLine: true,
        },
      ],
    },
  },
];