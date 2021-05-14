const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
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
  plugins: [
    new MiniCssExtractPlugin({ filename: 'style.css' }),
  ],
}