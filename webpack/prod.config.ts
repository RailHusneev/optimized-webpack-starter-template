import webpack from "webpack";
import webpackDevServer from "webpack-dev-server";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";
import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";

import { PATHS } from "./lib/utils";

const prodConfig: webpack.Configuration & webpackDevServer.Configuration = {
  output: {
    path: PATHS.OUTPUT,
    filename: "[name].[hash:4].js",
    sourceMapFilename: "[name].[hash:4].map",
    clean: true,
  },
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["giflossy", { optimizationLevel: 3 }],
              ["mozjpeg", { quality: 60 }],
              ["pngquant", { quality: [0.4, 0.6] }],
              "svgo",
            ],
          },
        },
      }),
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10,
          enforce: true,
          filename: "vendors.[hash:4].js",
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: PATHS.PUBLIC,
          to: PATHS.OUTPUT,
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
  ],
};

export default prodConfig;
