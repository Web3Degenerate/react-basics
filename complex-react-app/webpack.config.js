/*  
    Added new webpack.config.js in L79 (3:30): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19268420#overview
    Source: https://raw.githubusercontent.com/LearnWebCode/react-course/master/02-webpack-end.txt
  */

  const currentTask = process.env.npm_lifecycle_event
  const path = require("path")
  const Dotenv = require("dotenv-webpack")
  const { CleanWebpackPlugin } = require("clean-webpack-plugin")
  const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin")
  const HtmlWebpackPlugin = require("html-webpack-plugin")
  const fse = require("fs-extra")
  
  /*
    Because I didn't bother making CSS part of our
    webpack workflow for this project I'm just
    manually copying our CSS file to the DIST folder. 
  */
  class RunAfterCompile {
    apply(compiler) {
      compiler.hooks.done.tap("Copy files", function () {
        fse.copySync("./app/main.css", "./dist/main.css")
  
        /*
          If you needed to copy another file or folder
          such as your "images" folder, you could just
          call fse.copySync() as many times as you need
          to here to cover all of your files/folders.
        */
      })
    }
  }
  
  config = {
    entry: "./app/Main.js",
    output: {
      publicPath: "/",
      path: path.resolve(__dirname, "app"),
      filename: "bundled.js",
    },
    plugins: [
      new Dotenv(),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "app/index-template.html",
        alwaysWriteToDisk: true,
      }),
      new HtmlWebpackHarddiskPlugin(),
    ],
    mode: "development",
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react", ["@babel/preset-env", { targets: { node: "12" } }]],
            },
          },
        },
      ],
    },
  }
  
  if (currentTask == "webpackDev" || currentTask == "dev") {
    config.devtool = "source-map"
    config.devServer = {
      port: 3000,
      static: {
        directory: path.join(__dirname, "app")
      },
      hot: true,
      liveReload: false,
      historyApiFallback: { index: "index.html" },
    }
  }
  
  if (currentTask == "webpackBuild") {
    config.plugins.push(new CleanWebpackPlugin(), new RunAfterCompile())
    config.mode = "production"
    config.output = {
      publicPath: "/",
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[chunkhash].js",
      chunkFilename: "[name].[chunkhash].js",
    }
  }
  
  module.exports = config

/*
// Replaced original webpack.config.js replaced in L79 (3:30): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/19268420#overview
// const path = require("path")

// module.exports = {
//   entry: "./app/Main.js",
//   output: {
//     publicPath: "/",
//     path: path.resolve(__dirname, "app"),
//     filename: "bundled.js"
//   },
//   mode: "development",
//   devtool: "source-map",
//   devServer: {
//     port: 3000,
//     static: {
//       directory: path.join(__dirname, "app")
//     },
//     hot: true,
//     liveReload: false,
//     historyApiFallback: { index: "index.html" }  //Added in L18 (~17:30): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18081715#overview
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /(node_modules)/,
//         use: {
//           loader: "babel-loader",
//           options: {
//             presets: ["@babel/preset-react", ["@babel/preset-env", { targets: { node: "12" } }]]
//           }
//         }
//       }
//     ]
//   }
// }

*/