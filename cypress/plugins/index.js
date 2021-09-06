module.exports = (on, config) => {
    require('@cypress/react/plugins/load-webpack')(on, config, {webpackFilename: 'webpack.cypress.config.js'});
    require('@cypress/code-coverage/task')(on, config);

    on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'));

    return config;
};