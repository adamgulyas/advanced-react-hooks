import globals from 'globals'
import babelParser from '@babel/eslint-parser'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import js from '@eslint/js'
import {FlatCompat} from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  ...compat.extends('eslint:recommended', 'plugin:react/recommended'),
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },

      parser: babelParser,
      ecmaVersion: 12,
      sourceType: 'module',

      parserOptions: {
        requireConfigFile: false,

        babelOptions: {
          presets: ['@babel/preset-react'],
        },
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      'react/prop-types': 'off',
      'no-unused-vars': 'off',
      'react/no-unescaped-entities': 'off',
    },
  },
]

