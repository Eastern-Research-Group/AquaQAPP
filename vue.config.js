module.exports = {
  productionTip: false,
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
  },
  devServer: {
    host: 'localhost',
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].template = `${__dirname}/client/public/index.html`;
      return args;
    });
  },
};
