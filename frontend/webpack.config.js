const path = require("path")

module.exports = {
  mode: "development",
  entry: {
    main: "./js/app.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    overlay: true,
    stats: "errors-only",
  },
}