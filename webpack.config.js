var path = require('path');
const webpack = require('webpack'); //to access built-in plugins
var CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
  entry: {
    app: './src/main.js'
   
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
      rules: [
          {
          test: /\.html$/,
          use: [{ loader: 'raw-loader' }]
          },
          {
            test: /\.ts$/,
            loaders:['awesome-typescript-loader']  
          }
      ]
  },
  resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        jsoneditor:path.resolve(__dirname,'./node_modules/jsoneditor/dist/jsoneditor.js')
    }
  },
  plugins: [
  //   , new webpack.optimize.UglifyJsPlugin()
  //  ,new CompressionPlugin({
  //     asset: "bundle.js.gz",
  //     algorithm: "gzip",
  //     test: /\.js$|\.css$|\.html$/,
  //     threshold: 10240,
  //     minRatio: 0
  //   })
    
  ]
  
};