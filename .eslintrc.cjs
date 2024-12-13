import globals from "globals";
import prettier from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.mjs"], // Spécifiez les fichiers concernés
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      // Règles ESLint classiques
      "no-console": ["warn", { allow: ["error"] }],
 
      // Règles Prettier
      "prettier/prettier": [
        "error",
        {
          printWidth: 80,
          tabWidth: 4,
          useTabs: false,
          semi: true,
          singleQuote: false,
          trailingComma: "all",
          bracketSpacing: true,
          arrowParens: "always",
          endOfLine: "auto",
        },
      ],
    },
  },
];