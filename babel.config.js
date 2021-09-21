export default {
    comments: false,
    env: {
        production: {presets: ['babel-preset-minify']},
        test: {plugins: ['istanbul']}
    },
    plugins: [
        ['@babel/plugin-proposal-decorators', {legacy: true}],
        '@babel/plugin-proposal-class-properties',
        ['module-extension-resolver', {
            dstExtension: '.js',
            extensionsToKeep: ['.json'],
            srcExtensions: ['.js', '.jsx', '.json']
        }]
    ],
    presets: [
        ['@babel/preset-env', {modules: false}],
        '@babel/preset-react'
    ]
};