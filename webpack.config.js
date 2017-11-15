var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    // Set up an ES6-ish environment
    'babel-polyfill',

    // Add your application's files below
    './src/css/main.scss',
    './src/js/app'
  ],
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'src'),
    filename: 'bundle.js'
  },
  debug: true,
  module: {
    loaders: [
      {
        loader: 'babel-loader',

        // Only run `.js` files through Babel
        test: /\.js$/,

        // Skip any files outside of your project's `src` directory
        include: path.join(__dirname, 'src')
      },

      // Load SCSS
      {
        loader: "style!css!autoprefixer!sass",
        test: /\.scss$/,
        include: path.join(__dirname, 'src/css')
      },

      // Load plain-ol' vanilla CSS
      {
        loader: "style!css",
        test: /\.css$/,
        include: path.join(__dirname, 'src/css')
      }
    ]
  },
  plugins: [
    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin()
  ],
  devServer: {
    contentBase: "./src"
  },
  stats: {
    // Nice colored output
    colors: true
  },
  // Create Sourcemaps for the bundle
  devtool: 'source-map'
};
