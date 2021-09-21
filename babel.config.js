export default {
    comments: false,
    env: {
        production: {presets: ['babel-preset-minify']},
        test: {plugins: ['istanbul']}
    },
    plugins: [
        ['@babel/plugin-proposal-decorators', {legacy: true}],
        '@babel/plugin-proposal-class-properties'
    ],
    presets: [
        ['@babel/preset-env', {modules: false}],
        '@babel/preset-react'
    ]
};