const webpack = require("webpack");
const path = require("path");
const webpackMerge = require("webpack-merge");

const modeConfig = env => require(`./build/webpack.${env}`)(env);

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
  return webpackMerge({
    mode,
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, 'public'),
      publicPath: "/"
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 5000
            }
          }
        }
      ] 
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    devServer: {
      contentBase: './public',
      hot: true
    }
  },
  modeConfig(mode))
}