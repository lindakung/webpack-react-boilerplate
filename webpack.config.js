const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackMerge = require("webpack-merge");

const modeConfig = env => require(`./build/webpack.${env}`)(env);

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
  return webpackMerge({
    mode,
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, 'public')
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new webpack.ProgressPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 5000,
            }
          }
        }
      ] 
    }
  },
  modeConfig(mode))
}