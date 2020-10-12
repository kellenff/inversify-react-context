module.exports = {
  parser:        '@typescript-eslint/parser',
  plugins:       ['react', '@typescript-eslint'],
  extends:       [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion:  2018,
    sourceType:   'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings:      {
    react: {
      pragma:  'React',
      version: 'detect',
    },
  },
  rules:         {
    'react/prop-types': ['off'],
  },
};
