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
  },
  devServer: {
    host: 'localhost',
  },
};
