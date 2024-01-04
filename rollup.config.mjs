/* eslint-disable array-func/prefer-array-from */
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import cleaner from 'rollup-plugin-cleaner';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import scss from 'rollup-plugin-scss';

// eslint-disable-next-line import/extensions
import pkg from './package.json' assert { type: "json" };
// eslint-disable-next-line import/extensions
import yalcPublish from './rollupPlugins/yalcPublish.mjs';

const globals = {
    react: 'React',
    'styled-components': 'styled'
};

export default [
    {
        external: [...Object.keys(pkg.peerDependencies || {}), ...Object.keys(pkg.externals || {})],
        input: 'src/index.tsx',
        output: [
            {
                exports: 'named',
                file: pkg.exports['.'].require,
                format: 'cjs',
                globals,
                interop: 'auto',
                name: pkg.name,
                sourcemap: true
            },
            {
                dir: './dist/esm/',
                exports: 'named',
                format: 'es',
                globals,
                name: pkg.name,
                preserveModules: true,
                sourcemap: true
            }
        ],
        plugins: [
            cleaner({targets: ['./dist/']}),
            resolve({extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']}),
            commonjs({include: ['node_modules/**']}),
            babel({
                babelHelpers: 'bundled',
                extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
            })
        ]
    },
    {
        input: 'src/sass/app.scss',
        output: {
            dir: './dist/css/',
            format: 'esm'
        },
        plugins: [
            del({
                hook: 'closeBundle',
                targets: 'dist/css/app.js'
            }),
            scss({
                fileName: 'bundle.css',
                outputStyle: 'compressed'
            }),
            copy({
                targets: [
                    {
                        dest: 'dist/sass',
                        src: 'src/sass/**/*'
                    },
                    {
                        dest: 'dist/vscode',
                        src: 'src/vscode/**/*'
                    }
                ]
            }),
            yalcPublish()
        ]
    }
];