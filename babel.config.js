module.exports = {
    comments: false,
    env: {test: {plugins: ['istanbul']}},
    plugins: [
        ['@babel/plugin-proposal-decorators', {legacy: true}],
        '@babel/plugin-proposal-class-properties',
        ['styled-components', {
            fileName: true,
            preprocess: false,
            pure: true,
            ssr: true
        }]
    ],
    presets: [
        ['@babel/preset-env'],
        '@babel/preset-react'
    ]
};