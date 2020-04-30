import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import svelte from 'rollup-plugin-svelte';

const commonBabelConfig = require('./babel.config');

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/jira-linkify.js',
      name: 'jiraLinkify',
      format: 'umd',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      svelte({
        // By default, all .svelte and .html files are compiled
        extensions: ['.svelte', '.html'],

        // You can restrict which files are compiled
        // using `include` and `exclude`
        include: 'src/components/**/*.svelte',

        // By default, the client-side compiler is used. You
        // can also use the server-side rendering compiler

        // ensure that extra attributes are added to head
        // elements for hydration (used with ssr: true)
        hydratable: false,

        // Emit CSS as "files" for other plugins to process
        emitCss: false,

        // Extract CSS into a separate file (recommended).
        // See note below
        css(css) {
          // creates `main.css` and `main.css.map` — pass `false`
          // as the second argument if you don't want the sourcemap
          css.write('dist/jira-linkify.css');
        },

        // Warnings are normally passed straight to Rollup. You can
        // optionally handle them here, for example to squelch
        // warnings with a particular code
        onwarn: (warning, handler) => {
          // e.g. don't warn on <marquee> elements, cos they're cool
          if (warning.code === 'a11y-distracting-elements') return;

          // let Rollup handle all other warnings normally
          handler(warning);
        },
      }),
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
      commonjs(),
    ],
  },
];
