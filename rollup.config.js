import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

const commonBabelConfig = require('./babel.config');

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/jira-linkify.js',
      name: 'jiraLinkify',
      format: 'umd',
    },
    plugins: [
      resolve(),
      babel({
        ...commonBabelConfig,
        babelrc: false,
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                browsers: ['last 2 Chrome versions'],
              },
              modules: false,
            },
          ],
        ],
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      commonjs(),
    ],
  },
];
