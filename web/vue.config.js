module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        // should only contain the variables, not the actual sass
        prependData: '@import "@/assets/sass/global-variables.sass"',
      },
    },
  },
  outputDir: 'dist',
  chainWebpack: (config) => {
  // Pug Loader
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-plain-loader')
      .loader('pug-plain-loader')
      .end();
  },
};
