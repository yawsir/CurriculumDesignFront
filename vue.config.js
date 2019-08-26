module.exports = {
    // ...
    css: {
      loaderOptions: {
        sass: {
          data: `
            @import "@/config/colorConfig.scss";`
        }
      }
    }
  }