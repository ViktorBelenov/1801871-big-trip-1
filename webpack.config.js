const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, 'build'),
        clean: true
    },
    devtool:'source-map',

    plugins: [
        new CopyPlugin({
          patterns: [
           {
            from: "public",
            globOptions: {
                    ignore: ["**/index.html"],
            }
        }

          ],

        }),
        new HtmlWebpackPlugin({
          template: 'public/index.html'
        }
        )
      ],

      module: {
        rules: [
            {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              },
            },
          }
        ]
        }
    };
