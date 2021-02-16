import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import ts from 'typescript';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';

import pkg from './package.json';

export default {
  input: './src/index.ts',
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  output: [
    {
      file: `dist/${pkg.module}`,
      format: 'es',
      sourcemap: true,
    },
    {
      file: `dist/${pkg.main}`,
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    commonjs(),
    resolve(),
    postcss(),
    typescript({
      typescript: ts,
      tsconfig: 'tsconfig.json',
      tsconfigDefaults: {
        exclude: [
          '**/*.spec.ts',
          '**/*.test.ts',
          '**/*.stories.ts',
          '**/*.spec.tsx',
          '**/*.test.tsx',
          '**/*.stories.tsx',
          'node_modules',
          'dist',
        ],
        compilerOptions: {
          sourceMap: true,
          declaration: true,
        },
      },
    }),
    terser({
      output: {
        comments: false,
      },
    }),
    copy({
      targets: [
        { src: 'LICENSE', dest: 'dist' },
        { src: 'README.md', dest: 'dist' },
        {
          src: 'package.json',
          dest: 'dist',
          transform: (content) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { scripts, devDependencies, husky, release, engines, ...keep } = JSON.parse(
              content.toString()
            );
            return JSON.stringify(keep, null, 2);
          },
        },
      ],
    }),
  ],
};
