const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  runtimeCompiler: true,
  outputDir: `${__dirname}/client/dist`,
  configureWebpack: {
    resolve: {
      alias: {
        '@': `${__dirname}/client/src`,
      },
    },
    entry: {
      app: './client/src/main.js',
    },
    devtool: 'source-map',
    plugins: [
      // Make sure all files are copied from public to dist (required since our vue-cli directory is nested inside client)
      new CopyWebpackPlugin([
        {
          from: path.join(__dirname, 'client/public'),
          to: path.join(__dirname, 'client/dist'),
          toType: 'dir',
          ignore: ['index.html', '.DS_Store'],
        },
      ]),
    ],
  },
  devServer: {
    host: 'localhost',
  },
  // Make sure client/public/index.html is used for main template
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].template = `${__dirname}/client/public/index.html`;
      return args;
    });
  },
};
