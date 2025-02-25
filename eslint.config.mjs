import antfu from '@antfu/eslint-config'

export default antfu(
  {
    rules: {
      'no-console': 'off',
      'node/prefer-global/process': 'off',
      'vue/custom-event-name-casing': 'off',
      'vue/component-name-in-template-casing': 'off',
      'vue/require-toggle-inside-transition': 'off',
    },
    overrides: [
      {
        files: ['*'], // 对所有文件生效
        excludedFiles: [
          '*.sh',
          '*.md',
          '*.woff',
          '*.ttf',
          'node_modules/**',
          '.vscode/**',
          '.idea/**',
          'dist/**',
          'public/**',
          'docs/**',
          '.local/**',
          'bin/**',
          'Dockerfile',
        ],
      },
    ],
  },
)
