module.exports = {
  publicPath: '/',
  // publicPath: '/tools/arre/'

  // devServer: {
  //   proxy: 'http://10.10.0.102:8080'
  //   // proxy: { 
  //   //   '^/test': {
  //   //     target: 'http://192.168.1.101:8000',
  //   //     changeOrigin: true
  //   //   }
  //   // },
  // },

  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
      args[0].title = 'Gestión Stock'
      return args
    })
  }

}