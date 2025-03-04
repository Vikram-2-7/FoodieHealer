const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.module.rules.push({
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
      },
    },
  });

  // Fix MIME type issues
  config.devServer = {
    ...config.devServer,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    static: {
      directory: path.join(__dirname, 'web'),
      publicPath: '/',
      serveIndex: true,
      watch: true,
    },
    hot: true,
    historyApiFallback: true,
  };

  return config;
}; 