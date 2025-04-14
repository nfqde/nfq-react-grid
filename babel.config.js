module.exports = {
    comments: false,
    env: {test: {plugins: ['istanbul']}},
    plugins: [
        ['@babel/plugin-proposal-decorators', {legacy: true}],
        ['@babel/plugin-transform-class-properties', {loose: false}],
        '@babel/plugin-transform-typescript',
        '@babel/plugin-syntax-import-assertions',
        ['@emotion', {
            autoLabel: 'never',
            cssPropOptimization: true,
            labelFormat: '[dirname]_[filename]__[local]',
            sourceMap: true
        }]
    ],
    presets: [
        ['@babel/preset-env', {modules: false}],
        ['@babel/preset-react'],
        ['@babel/preset-typescript']
    ]
};