const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8090,
    open: true,
    hot: true,
    host: '0.0.0.0',
    allowedHosts: 'all'
  },
  publicPath: './',
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            blue: '#FA6D1D'
          }
        }
      }
    }
  }

})
