/* eslint-disable array-func/prefer-array-from */
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import {uglify} from 'rollup-plugin-uglify';

// eslint-disable-next-line import/extensions
import pkg from './package.json';

const globals = {
    'prop-types': 'PropTypes',
    react: 'React',
    'styled-components': 'styled'
};

export default [
    {
        external: [...Object.keys(pkg.peerDependencies || {})],
        input: 'src/index.jsx',
        output: [
            {
                exports: 'named',
                file: pkg.main,
                format: 'cjs',
                globals,
                name: pkg.name,
                sourcemap: true
            },
            {
                exports: 'named',
                file: pkg.module,
                format: 'es',
                globals,
                name: pkg.name,
                sourcemap: true
            }
        ],
        plugins: [
            resolve({extensions: ['.js', '.jsx', '.json']}),
            commonjs({include: ['node_modules/**']}),
            babel({babelHelpers: 'bundled'})
        ]
    },
    {
        external: [...Object.keys(pkg.peerDependencies || {})],
        input: 'src/index.jsx',
        output: {
            file: pkg.browser,
            format: 'umd',
            globals,
            name: pkg.name
        },
        plugins: [
            resolve({extensions: ['.js', '.jsx', '.json']}),
            commonjs({include: ['node_modules/**']}),
            babel({babelHelpers: 'bundled'}),
            uglify()
        ]
    }
];