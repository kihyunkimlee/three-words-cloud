const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    main: './js/app.js',
  },
  output: {
    path: path.resolve('./dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, '/js')
        ],
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/polyfill']
          }
        }
      }
    ]
  },
  devServer: {
    overlay: true,
    stats: 'errors-only',
  },
}