module.exports = {
  devServer: {
    proxy: {
      '/users': {
        // target: 'http://8.129.212.211:4000',
			target: 'http://localhost:3000',
        // ws: true,
        changeOrigin: true
      }, 
	  '/adminapi': {
	    // target: 'http://8.129.212.211:4000',
	  		target: 'http://localhost:3000',
	    // ws: true,
			changeOrigin: true
	  }, 
    },
  }
}


