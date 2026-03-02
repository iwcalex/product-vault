const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: [
      '.expo/**',
      'node_modules/**',
      'android/**',
      'build/**',
      'coverage/**',
    ],
  },
  {
    settings: {
      react: {
        version: '19.0',
      },
    },
  },
  {
    files: ['__mocks__/**/*.js'],
    languageOptions: {
      globals: {
        jest: 'readonly',
      },
    },
  },
]);
