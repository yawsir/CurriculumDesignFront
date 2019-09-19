module.exports = {
    // ...
    css: {
      loaderOptions: {
        sass: {
          data: `
            @import "@/config/colorConfig.scss";`
        }
      }
    },
    // publicPath: process.env.NODE_ENV === 'production'
    // ? '/onlineOrder/'
    // : '/'
  }