import rootConfig from '../eslint.config.mjs';

export default [
  ...rootConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    ignores: ['vite.config.ts', '*.mjs'],

    languageOptions: {
      parserOptions: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tsconfigRootDir: import.meta.dirname,
        allowDefaultProject: true,
      },
    },
  },
];
