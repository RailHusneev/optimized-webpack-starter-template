import webpack from "webpack";
import webpackDevServer from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ProgressBarPlugin from "progress-bar-webpack-plugin";
import { isDevMode, PATHS, webpackMode } from "./lib/utils";
import ReactRefreshTypeScript from "react-refresh-typescript";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import chalk from "chalk";

const baseConfig: webpack.Configuration & webpackDevServer.Configuration = {
  mode: webpackMode,
  context: __dirname,
  entry: PATHS.ENTRY,
  devtool: isDevMode ? "cheap-module-source-map" : "source-map",
  output: {
    path: PATHS.OUTPUT,
    filename: "bundle.js",
  },
  resolve: {
    roots: [__dirname],
    extensions: [".ts", ".tsx", ".js", ".scss"],
    alias: {
      "@src": PATHS.SRC,
    },
  },
  cache: {
    type: "filesystem",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              getCustomTransformers: () => ({
                before: [isDevMode && ReactRefreshTypeScript()].filter(Boolean),
              }),
              transpileOnly: isDevMode,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          !isDevMode ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
                localIdentContext: PATHS.SRC,
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset",
      },
    ],
  },
  plugins: [
    new ProgressBarPlugin({
      total: 0,
      format: `:msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`,
    }) as any,
    new HtmlWebpackPlugin({ template: PATHS.HTML_TEMPLATE }),
  ],
};

export default baseConfig;
