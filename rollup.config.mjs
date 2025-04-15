/* eslint-disable array-func/prefer-array-from */
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import cleaner from 'rollup-plugin-cleaner';

// eslint-disable-next-line import/extensions
import pkg from './package.json' with { type: 'json' };
// eslint-disable-next-line import/extensions
import yalcPublish from './rollupPlugins/yalcPublish.mjs';

const globals = {
    // react: 'React',
    // 'styled-components': 'styled'
};

export default [
    {
        external: [
            '@emotion/hash',
            '@emotion/is-prop-valid',
            '@emotion/memoize',
            '@emotion/styled/base',
            '@emotion/serialize',
            '@emotion/unitless',
            '@emotion/use-insertion-effect-with-fallbacks',
            '@emotion/utils',
            ...Object.keys({
                ...pkg.dependencies,
                ...pkg.devDependencies,
                ...pkg.peerDependencies
            } || {})
        ],
        input: 'src/index.ts',
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
            }),
            yalcPublish()
        ]
    }
];