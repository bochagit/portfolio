import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'

export default [
  js.configs.recommended,

  { 
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node
      } 
    },
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks
    },
    rules: {
      'no-unused-vars': ['warn', {
        varsIgnorePattern: '^[A-Z_]'
      }],
      'no-undef': 'warn',
      'eqeqeq': 'error',
      'react/jsx-key': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2]
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
]
